let initialState = {
  currentUser: null,
  categories: [],
  exam: {}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, currentUser: action.payload }
    case "LOGOUT":
      return { ...state, currentUser: null }
    case "FETCH_CATEGORIES":
      return { ...state, categories: action.payload }
    case "NEW_EXA<":
      return { ...state, exam: action.payload }
    default:
      return state;
  }
}

export { rootReducer }