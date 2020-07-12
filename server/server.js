const config = require('./config')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const passwordAuth = require('./helpers/passwordAuth')
const jwtHelpers = require('./helpers/jwtHelpers')
const { v4: uuidv4 } = require('uuid')

if (config.enableCors) {
  const cors = require('cors')
  app.use(cors())
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const standardError = { error: 'Something Went wrong, please try again' }
const loginError = { error: 'Login information was incorrect, please try again' }
const accessDenied = { error: 'Unauthorized: Access Denied' }

app.get('/', async (req, res) => {
  try {
    const recipes = await loadRecipesCollection()
    const recipeName = { name: 1 }
    res.send(await recipes.find().sort(recipeName).toArray())
  } catch (err) {
    console.log(err)
    return res.status(500).send(standardError)
  }
})

app.get('/recipe/:id', async (req, res) => {
  const id = req.params.id
  try {
    const recipes = await loadRecipesCollection()
    res.send(await recipes.findOne({ _id: id }))
  } catch (err) {
    console.log(err)
    return res.status(500).send(standardError)
  }
})

app.delete('/', checkJWT, async (req, res) => {
  try {
    const recipes = await loadRecipesCollection()
    await recipes.deleteOne({ _id: req.body._id })
    if (req.locals) {
      res.send({
        token: req.locals.token
      })
    } else {
      res.send({ message: 'success' })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send(standardError)
  }
})

app.post('/', checkJWT, async (req, res) => {
  try {
    const recipes = await loadRecipesCollection()
    await recipes.insertOne(req.body)
    if (req.locals) {
      res.send({
        token: req.locals.token
      })
    } else {
      res.send({ message: 'success' })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send(standardError)
  }
})

app.put('/', checkJWT, async (req, res) => {
  if (req.headers.authorization) {
    const validReq = jwtHelpers.jwtVerify(req.headers.authorization.substring(7))
    if (validReq) {
      try {
        const recipes = await loadRecipesCollection()
        await recipes.findOneAndUpdate(
          { _id: req.body._id },
          {
            $set: {
              name: req.body.name,
              description: req.body.description,
              tags: req.body.tags,
              ingredients: req.body.ingredients,
              directions: req.body.directions
            }
          },
          {
            upsert: true
          }
        )
        if (req.locals) {
          res.send({
            token: req.locals.token
          })
        } else {
          res.send({ message: 'success' })
        }
      } catch (err) {
        console.error(err)
        return res.status(500).send(standardError)
      }
    } else {
      res.status(403).send(accessDenied)
    }
  } else {
    res.status(403).send(accessDenied)
  }
})

app.post('/register', async (req, res) => {
  const hash = await passwordAuth.hashPassword(req.body.password)
  try {
    const users = await loadUsersCollection()
    let userCount = 1
    users.countDocuments({}, (err, result) => {
      if (err) {
        console.log(err)
        res.send({ error: 'An unexpected error occurred'})
      } else {
        userCount = result
      }
    })
    const userObj = { username: req.body.username, password: hash }
    const existingUsername = await users.findOne({ username: userObj.username })
    if (userCount < 1) {
      if (existingUsername) {
        res.send({ error: 'Username already exists' })
      } else {
        const userID = uuidv4()
        try {
          const addUser = await users.insertOne(
            {
              uuid: userID,
              username: userObj.username,
              password: userObj.password
            }
          )
          if (addUser) {
            res.send({
              token: jwtHelpers.jwtSignUser({ uuid: userID })
            })
          }
        } catch (err) {
          console.error(err)
          return res.status(500).send(standardError)
        }
      }
    } else {
      res.send({ error: 'We are not accepting additional registrations at this time'})
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send(standardError)
  }
})

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const users = await loadUsersCollection()
    const user = await users.findOne({ username: username })

    if (!user) {
      return res.status(401).send(loginError)
    }

    const validPassword = await passwordAuth.comparePassword(user.password, password)
    if (!validPassword) {
      return res.status(401).send(loginError)
    }

    res.send({
      token: jwtHelpers.jwtSignUser({ uuid: user.uuid })
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send(standardError)
  }
})

app.post('/validate', async (req, res) => {
  try {
    const token = req.body.token
    if (jwtHelpers.jwtVerify(token).uuid) {
      if (req.headers.referer.includes('/recipe/')) {
        return res.status(200).send({ notification: false })
      }
      return res.status(200).send({ notification: true })
    } else {
      return res.status(500).send(standardError)
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send(standardError)
  }
})

app.listen(config.port, function () {
  console.log(`listening on ${config.port}`)
})

process.on('SIGINT', function() {
  console.log( '\nGracefully shutting down from SIGINT (Ctrl-C)' );
  process.exit(1);
});

async function loadRecipesCollection () {
  const client = await MongoClient.connect(
    config.db.host,
    {
      useUnifiedTopology: true
    }
  )
  return client.db(config.db.database).collection(config.db.recipesCollection)
}

async function loadUsersCollection () {
  const client = await MongoClient.connect(
    config.db.host,
    {
      useUnifiedTopology: true
    }
  )
  return client.db(config.db.database).collection(config.db.userCollection)
}

function checkJWT (req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const validReq = jwtHelpers.jwtVerify(token)

    if (validReq.exp && Date.now() >= validReq.exp * 1000) {
      req.locals = { token: jwtHelpers.jwtSignUser({ uuid: validReq.uuid }) }
      next()
    } else if (!validReq.uuid) {
      return res.status(401).send(standardError)
    } else {
      next()
    }
  } else {
    return res.status(401).send(standardError)
  }
}
