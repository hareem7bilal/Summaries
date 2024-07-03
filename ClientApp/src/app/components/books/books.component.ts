import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import * as bookActions from "./../../store/book.actions";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
export class BooksComponent implements OnInit {
  public books$: Observable<Book[]>;
  public books: Book[];

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    // Adjust the selector to fetch the nested books array
    this.books$ = this.store.pipe(select(state => state.books.books));
    this.store.dispatch(new bookActions.LoadBooksAction());
    this.books$.subscribe((books: Book[]) => {
      console.log('Books:', books); // Check if books are an array
      this.books = books;
    });
  }


  showBook(id: number) {
    this.router.navigate(["/show-book/" + id]);
  }

  updateBook(id: number) {
    this.router.navigate(["/update-book/" + id]);
  }

  deleteBook(id: number) {
    this.store.dispatch(new bookActions.DeleteBookAction(id));
  }
}
