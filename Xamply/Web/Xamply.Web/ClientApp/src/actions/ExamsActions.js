let examsActions = {
  newExam: (exam) => {
    return {
      type: "NEW_EXAM",
      payload: exam
    }
  },
}

export { examsActions }