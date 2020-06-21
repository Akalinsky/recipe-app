const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const passwordAuth = require('./helpers/passwordAuth')
const jwtHelpers = require('./helpers/jwtHelpers')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Authorize this
app.get('/', async (req, res) => {
  try {
    const recipes = await loadRecipesCollection()
    const recipeName = { name: 1 }
    res.send(await recipes.find().sort(recipeName).toArray())
  } catch (err) {
    console.log(err)
  }
})

app.get('/recipe/:id', async (req, res) => {
  const id = req.params.id
  try {
    const recipes = await loadRecipesCollection()
    res.send(await recipes.findOne({ _id: id }))
  } catch (err) {
    console.log(err)
  }
})

app.delete('/', async (req, res) => {
  const validReq = jwtHelpers.jwtVerify(req.headers.authorization.substring(7))
  if (typeof validReq !== 'undefined') {
    try {
      const recipes = await loadRecipesCollection()
      res.send(await recipes.deleteOne({ _id: req.body._id }))
    } catch (err) {
      console.error(err)
    }
  } else {
    res.status(403).send()
  }
})

app.post('/', async (req, res) => {
  const validReq = jwtHelpers.jwtVerify(req.headers.authorization.substring(7))
  if (typeof validReq !== 'undefined') {
    try {
      const recipes = await loadRecipesCollection()
      res.send(await recipes.insertOne(req.body))
    } catch (err) {
      console.error(err)
    }
  } else {
    res.status(403).send()
  }
})

app.put('/', async (req, res) => {
  const validReq = jwtHelpers.jwtVerify(req.headers.authorization.substring(7))
  if (typeof validReq !== 'undefined') {
    try {
      const recipes = await loadRecipesCollection()
      res.send(await recipes.findOneAndUpdate(
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
      ))
    } catch (err) {
      console.error(err)
    }
  } else {
    res.status(403).send()
  }
})

app.post('/register', async (req, res) => {
  const hash = await passwordAuth.hashPassword(req.body.password)
  try {
    const users = await loadUsersCollection()
    const userObj = { username: req.body.username, password: hash }
    const existingUsername = await users.findOne({ username: userObj.username })

    if (existingUsername) {
      res.send({ error: 'Username already exists' })
    } else {
      try {
        const addUser = await users.insertOne(
          {
            username: userObj.username,
            password: userObj.password
          }
        )

        res.send({
          username: addUser.ops[0].username,
          token: jwtHelpers.jwtSignUser(userObj)
        })
      } catch (err) {
        console.error(err)
      }
    }
  } catch (err) {
    console.error(err)
  }
})

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const users = await loadUsersCollection()
    const user = await users.findOne({ username: username })

    if (!user) {
      return res.status(403).send({
        error: 'Your login information was incorrect'
      })
    }

    const validPassword = await passwordAuth.comparePassword(user.password, password)
    if (!validPassword) {
      console.log('fired')
      return res.status(403).send({ error: 'Your login information was incorrect' })
    }

    res.send({
      username: user.username,
      token: jwtHelpers.jwtSignUser({ username: user.username, password: user.password })
    })
  } catch (err) {
    console.error(err)
  }
})

app.listen(3000, function () {
  console.log('listening on 3000')
})

async function loadRecipesCollection () {
  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017',
    {
      useUnifiedTopology: true
    }
  )
  return client.db('cookbook').collection('recipes')
}

async function loadUsersCollection () {
  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017',
    {
      useUnifiedTopology: true
    }
  )
  return client.db('cookbook').collection('users')
}
