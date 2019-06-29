import axios from "axios";

// -----------------------------  SAVED BOOKS  ----------------------------
export const savedBooksHasErrored = bool => ({
  type: "SAVED_BOOKS_HAS_ERRORED",
  hasErrored: bool,
});

export const savedBooksIsLoading = bool => ({
  type: "SAVED_BOOKS_IS_LOADING",
  isLoading: bool,
});

export const savedBooksFetchDataSuccess = books => ({
  type: "SAVED_BOOKS_FETCH_DATA_SUCCESS",
  books,
});

export const savedBooksFetchData = () => dispatch => {
  dispatch(savedBooksHasErrored(false));
  dispatch(savedBooksIsLoading(true));

  axios
    .get("/api/books")
    .then(response => {
      dispatch(savedBooksIsLoading(false));
      dispatch(savedBooksFetchDataSuccess(response.data));
    })
    .catch(() => {
      dispatch(savedBooksIsLoading(false));
      dispatch(savedBooksHasErrored(true));
    });
};

export const addToSavedBooksSuccess = (googleBooksId, databaseId) => ({
  type: "ADD_TO_SAVED_BOOKS_SUCCESS",
  googleBooksId,
  databaseId,
});

export const deleteFromSavedBooksSuccess = databaseId => ({
  type: "DELETE_FROM_SAVED_BOOKS_SUCCESS",
  databaseId,
});

export const addToSavedBooks = book => dispatch => {
  dispatch(savedBooksHasErrored(false));
  dispatch(savedBooksIsLoading(true));

  axios
    .post("/api/books/", book)
    .then(response => {
      dispatch(savedBooksIsLoading(false));
      dispatch(addToSavedBooksSuccess(book.googleBooksId, response.data._id));
    })
    .catch(() => {
      dispatch(savedBooksIsLoading(false));
      dispatch(savedBooksHasErrored(true));
    });
};

export const deleteSavedBook = bookId => dispatch => {
  dispatch(savedBooksHasErrored(false));
  dispatch(savedBooksIsLoading(true));

  axios
    .delete(`/api/books/${bookId}`)
    .then(() => {
      dispatch(deleteFromSavedBooksSuccess(bookId));
      dispatch(savedBooksFetchData());
    })
    .catch(() => {
      dispatch(savedBooksIsLoading(false));
      dispatch(savedBooksHasErrored(true));
    });
};

// ----------------------------  SEARCH BOOKS  ----------------------------

export const searchBooksHasErrored = bool => ({
  type: "SEARCH_BOOKS_HAS_ERRORED",
  hasErrored: bool,
});

export const searchBooksIsLoading = bool => ({
  type: "SEARCH_BOOKS_IS_LOADING",
  isLoading: bool,
});

export const searchBooksFetchDataSuccess = books => ({
  type: "SEARCH_BOOKS_FETCH_DATA_SUCCESS",
  books,
});

export const searchBooksFetchData = query => dispatch => {
  dispatch(searchBooksHasErrored(false));
  dispatch(searchBooksIsLoading(true));

  axios
    .get(`/api/search?q=${query}`)
    .then(response => {
      dispatch(searchBooksIsLoading(false));
      dispatch(searchBooksFetchDataSuccess(response.data));
    })
    .catch(() => {
      dispatch(searchBooksIsLoading(false));
      dispatch(searchBooksHasErrored(true));
    });
};