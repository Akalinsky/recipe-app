module.exports = {
  port: process.env.RECIPE_APP_SERVER_PORT || 3000,
  db: {
    host: process.env.RECIPE_APP_SERVER_DB_HOST || 'mongodb://127.0.0.1:27017',
    database: process.env.RECIPE_APP_SERVER_DB || 'cookbook',
    recipesCollection: process.env.RECIPE_APP_SERVER_RECIPES_COLLECTION || 'recipes',
    userCollection: process.env.RECIPE_APP_SERVER_USER_COLLECTION || 'users',

  },
  jwtSecret: process.env.RECIPE_APP_SERVER_JWT_SECRET || 'secret',
  corsAllowed: process.env.RECIPE_APP_SERVER_ORIGIN_ALLOWED_URL || 'http://localhost:8080',
}
