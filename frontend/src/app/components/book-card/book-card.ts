import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../models/book';
import { BookCover } from '../book-cover/book-cover';

@Component({
  selector: 'app-book-card',
  imports: [RouterLink, BookCover],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCard {
  book = input.required<Book>();
  isFavorite = input(false);

  toggleFavorite = output<string>();
  addToCart = output<string>();
}
