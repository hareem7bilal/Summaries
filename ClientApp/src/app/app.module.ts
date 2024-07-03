import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { DeleteBookComponent } from './components/delete-book/delete-book.component';
import { NewBookComponent } from './components/new-book/new-book.component';
import { ShowBookComponent } from './components/show-book/show-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { BookService } from './services/book.service';
import { StoreModule } from '@ngrx/store';
import { BookReducer } from './store/book.reducer';
import { Effect, EffectsModule } from '@ngrx/effects';
import { BookEffects } from './store/book.effects';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    BooksComponent,
    CallbackComponent,
    DeleteBookComponent,
    NewBookComponent,
    ShowBookComponent,
    UpdateBookComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'books', component: BooksComponent, canActivate: [AuthGuard]},
      { path: 'new-book', component: NewBookComponent, canActivate: [AuthGuard]},
      { path: 'update-book/:id', component: UpdateBookComponent, canActivate: [AuthGuard]},
      { path: 'delete-book/:id', component: DeleteBookComponent, canActivate: [AuthGuard]},
      { path: 'show-book/:id', component: ShowBookComponent, canActivate: [AuthGuard]},
      { path: 'callback', component: CallbackComponent }
    ]),
    StoreModule.forRoot({ books: BookReducer }),
    EffectsModule.forRoot([BookEffects])
  ],
  providers: [BookService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
