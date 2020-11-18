let initialState = {
  currentUser: null,
  categories: [],
  exam: null,
  examAnswers: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, currentUser: action.payload }
    case "LOGOUT":
      return { ...state, currentUser: null }
    case "FETCH_CATEGORIES":
      return { ...state, categories: action.payload }
    case "NEW_EXAM":
      return { ...state, exam: action.payload }
    case "ADD_USER_ANSWER":
      let cloneExamAnswers = [...state.examAnswers]
      cloneExamAnswers.push(action.payload)
      return { ...state, examAnswers: cloneExamAnswers }
    default:
      return state;
  }
}

export { rootReducer }