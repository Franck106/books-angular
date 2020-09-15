import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Book } from '../models/books.models';

@Component({
  selector: 'app-restapi',
  template: `
    <style>
      table {
        border-collapse: separate;
        border-spacing: 50px 0;
      }
      td {
        padding: 10px;
      }
    </style>
    <section>
      <h2>Rest Api Output</h2>
      <table align="center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Rating</th>
            <th>Year</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let book of _books">
            <td>{{book.title}}</td>
            <td>{{book.rating}}</td>
            <td>{{book.year}}</td>
            <td>{{book.publisher}}</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styleUrls: ['./restapi.component.css']
})
export class RestapiComponent implements OnInit {

  constructor(private api: ApiService) { }

  _books: Book[];

  ngOnInit(): void {
    this.getBooks();
  }

  //Get all books
  getBooks() {
    this.api.getBooks().subscribe(
      (data) => { this._books = data }
    )
  }

}
