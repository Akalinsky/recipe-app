const jwt = require('jsonwebtoken')

module.exports = {
  jwtSignUser (user) {
    const THREE_DAYS = 60 * 60 * 24 * 3
    return jwt.sign(user, 'secret', {
      expiresIn: THREE_DAYS
    })
  },
  jwtVerify (token) {
    return jwt.verify(token, 'secret', { ignoreExpiration: true }, function (err, decoded) {
      if (err) {
        console.log(err)
        return err
      }
      return decoded
    })
  }
}
