export const savedBooksHasErrored = (state = false, action) => {
    switch (action.type) {
      case "SAVED_BOOKS_HAS_ERRORED":
        return action.hasErrored;
      default:
        return state;
    }
  };
  
  export const savedBooksIsLoading = (state = false, action) => {
    switch (action.type) {
      case "SAVED_BOOKS_IS_LOADING":
        return action.isLoading;
      default:
        return state;
    }
  };
  
  export const savedBooks = (state = [], action) => {
    switch (action.type) {
      case "SAVED_BOOKS_FETCH_DATA_SUCCESS":
        return action.books;
      default:
        return state;
    }
  };
  