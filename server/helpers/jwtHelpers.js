const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
  jwtSignUser (user) {
    const ONE_HOUR = 60 * 60
    return jwt.sign(user, config.jwtSecret, {
      expiresIn: ONE_HOUR
    })
  },
  jwtVerify (token) {
    return jwt.verify(token, config.jwtSecret, { ignoreExpiration: true }, function (err, decoded) {
      if (err) {
        console.log(err)
        return err
      }
      return decoded
    })
  }
}
