let usersActions = {
  login: (currentUser) => {
    return {
      type: "LOGIN",
      payload: currentUser
    }
  },
  logout: () => {
    return {
      type: "LOGOUT",
      payload: {}
    }
  }
}

export { usersActions }