const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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
  try {
    const recipes = await loadRecipesCollection()
    res.send(await recipes.deleteOne({ _id: req.body._id }))
  } catch (err) {
    console.error(err)
  }
})

app.post('/', async (req, res) => {
  try {
    const recipes = await loadRecipesCollection()
    res.send(await recipes.insertOne(req.body))
  } catch (err) {
    console.error(err)
  }
})

app.put('/', async (req, res) => {
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
