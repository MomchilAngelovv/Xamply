let categoriesActions = {
  fetchCategories: (categories) => {
    return {
      type: "FETCH_CATEGORIES",
      payload: categories
    }
  },
}

export { categoriesActions }