export const searchBooksHasErrored = (state = false, action) => {
    switch (action.type) {
      case "SEARCH_BOOKS_HAS_ERRORED":
        return action.hasErrored;
      default:
        return state;
    }
  };
  
  export const searchBooksIsLoading = (state = false, action) => {
    switch (action.type) {
      case "SEARCH_BOOKS_IS_LOADING":
        return action.isLoading;
      default:
        return state;
    }
  };
  
  export const searchBooks = (state = [], action) => {
    switch (action.type) {
      case "SEARCH_BOOKS_FETCH_DATA_SUCCESS":
        return action.books;
      case "ADD_TO_SAVED_BOOKS_SUCCESS":
        return state.map(searchBook =>
          searchBook.googleBooksId === action.googleBooksId
            ? { ...searchBook, _id: action.databaseId }
            : searchBook
        );
      case "DELETE_FROM_SAVED_BOOKS_SUCCESS":
        return state.map(searchBook => {
          if (searchBook._id === action.databaseId) {
            const { _id, ...searchBookWithoutId } = searchBook;
            return searchBookWithoutId;
          }
          return searchBook;
        });
      default:
        return state;
    }
  };