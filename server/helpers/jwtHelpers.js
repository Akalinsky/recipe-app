const jwt = require('jsonwebtoken')

module.exports = {
  jwtSignUser (user) {
    const ONE_DAY = 60 * 60 * 24
    return jwt.sign(user, 'secret', {
      expiresIn: ONE_DAY
    })
  },
  jwtVerify (token) {
    return jwt.verify(token, 'secret', function (err, decoded) {
      if (err) {
        console.log(err)
      }
      if (typeof decoded !== 'undefined') {
        return true
      } else {
        return false
      }
    })
  }
}
