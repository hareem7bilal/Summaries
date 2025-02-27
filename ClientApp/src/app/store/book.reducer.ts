import * as bookActions from "./book.actions";
import * as types from "./action.types";
import { AppState } from "./app.state";

export interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: [],
};

export function BookReducer(
  state = initialState,
  action: bookActions.Actions
): BooksState {
  switch (action.type) {
    case types.LOAD_BOOKS_SUCCESS: {
      return { ...state, books: action.payload };
    }
    case types.DELETE_BOOK_SUCCESS: {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    }
    default:
      return state;
  }
}
