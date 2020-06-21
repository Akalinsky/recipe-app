const bcrypt = require('bcrypt')

module.exports = {

  async hashPassword (password) {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          reject(err)
        }
        resolve(hash)
      })
    })
    return hashedPassword
  },
  async comparePassword (dbPassword, userPassword) {
    const validPassword = await new Promise((resolve, reject) => {
      bcrypt.compare(userPassword, dbPassword, function (err, result) {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
    return validPassword
  }
}
