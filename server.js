const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')

app.use(cors())

app.get('/', async (req, res) => {
  const recipes = await loadRecipesCollection()
  res.send(await recipes.find().toArray())
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
