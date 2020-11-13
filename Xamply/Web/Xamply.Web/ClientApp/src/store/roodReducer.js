let initialState = {
  currentUser: null,
  categories: [{ name: "Maths" }, { name: "Art" }]
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, currentUser: action.payload }
    case "LOGOUT":
      return { ...state, currentUser: null }
    default:
      return state;
  }
}

export { rootReducer }