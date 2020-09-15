import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/books.models';
import { catchError } from 'rxjs/operators';

//URL for api
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createBook(book: Book): Observable<any> {
    let body = JSON.stringify(book);
    alert(book);
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(API_URL + '/books', body, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  getBooks(): Observable<Book[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Book[]>(API_URL + '/books', {headers}).pipe(
      catchError(this.handleError)
    );
  }

  getBookId(bookId: string): Observable<Book> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Book>(API_URL + '/books/' + bookId, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  updateBook(book: Book): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application.json');
    return this.http.put(API_URL + '/books/' + book.bookId, book, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  deleteBook(bookId: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(API_URL + '/books/' + bookId, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    return throwError(error);
  }

}
