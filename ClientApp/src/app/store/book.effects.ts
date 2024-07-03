import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as types from './action.types';
import * as bookActions from './book.actions';
import { BookService } from "../services/book.service";

@Injectable()
export class BookEffects {
    constructor(private service: BookService, private actions$: Actions) {}

    @Effect() loadBooks$: Observable<Action> = this.actions$.pipe(
        ofType<bookActions.LoadBooksAction>(types.LOAD_BOOKS),
        mergeMap(() => 
            this.service.getAllBooks().pipe(
                map(books => new bookActions.LoadBooksSuccessAction(books)),
                catchError(() => of({ type: 'LOAD_BOOKS_FAILED' }))
            )
        )
    );

    @Effect() deleteBook$: Observable<Action> = this.actions$.pipe(
        ofType<bookActions.DeleteBookAction>(types.DELETE_BOOK),
        mergeMap(action => 
            this.service.deleteBook(action.payload).pipe(
                map((book: Book) => new bookActions.DeleteBookSuccessAction(book.id)),
                catchError(() => of({ type: 'DELETE_BOOK_FAILED' }))
            )
        )
    );
}
