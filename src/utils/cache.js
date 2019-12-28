
export default {
  saveUser: (user = {}) => {
    localStorage.setItem('USER', JSON.stringify(user))
  },
  getUser: () => {
    return JSON.parse(localStorage.getItem('USER') || '{}')
  },
  clearUser: () => {
    localStorage.removeItem('USER')
  },
  clearAll: () => {
    localStorage.clearAll()
  }
}