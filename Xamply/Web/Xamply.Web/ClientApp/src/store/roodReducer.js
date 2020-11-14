let initialState = {
  currentUser: null,
  categories: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, currentUser: action.payload }
    case "LOGOUT":
      return { ...state, currentUser: null }
    case "FETCH_CATEGORIES":
      return { ...state, categories: action.payload }
    default:
      return state;
  }
}

export { rootReducer }