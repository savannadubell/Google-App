import { combineReducers } from "redux";
import {
  savedBooksHasErrored,
  savedBooksIsLoading,
  savedBooks,
} from "./savedBooks";
import {
  searchBooksHasErrored,
  searchBooksIsLoading,
  searchBooks,
} from "./searchBooks";

export default combineReducers({
  savedBooksHasErrored,
  savedBooksIsLoading,
  savedBooks,
  searchBooksHasErrored,
  searchBooksIsLoading,
  searchBooks,
});