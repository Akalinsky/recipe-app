export function clearStorage (keys) {
  keys.forEach(key => {
    window.localStorage.removeItem(key)
  })
}

export function setStorage (credentials) {
  for (const [key, value] of Object.entries(credentials)) {
    window.localStorage.setItem(key, value)
  }
}

export function readStorage () {
  const user = {}
  user.username = window.localStorage.getItem('username')
  user.token = window.localStorage.getItem('token')
  return user
}
