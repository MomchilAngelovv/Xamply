let usersActions = {
  login: (currentUser) => {
    return {
      type: "LOGIN",
      payload: currentUser
    }
  },
  logout: (videos) => {
    return {
      type: "LOGOUT",
      payload: {}
    }
  }
}

export { usersActions }