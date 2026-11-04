import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Book } from '../models/book';
import { API_URL } from '../core/api-config';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  favorites = signal<Book[]>([]);
  favoriteIds = computed(() => new Set(this.favorites().map((b) => b.id)));

  constructor(private http: HttpClient) {}

  loadFavorites(): Observable<{ books: Book[] }> {
    return this.http
      .get<{ books: Book[] }>(`${API_URL}/favorites`)
      .pipe(tap((res) => this.favorites.set(res.books)));
  }

  isFavorite(bookId: string): boolean {
    return this.favoriteIds().has(bookId);
  }

  toggleFavorite(bookId: string): Observable<{ books: Book[] }> {
    if (this.isFavorite(bookId)) {
      return this.http
        .delete<{ books: Book[] }>(`${API_URL}/favorites/${bookId}`)
        .pipe(tap((res) => this.favorites.set(res.books)));
    }
    return this.http
      .post<{ books: Book[] }>(`${API_URL}/favorites/${bookId}`, {})
      .pipe(tap((res) => this.favorites.set(res.books)));
  }

  clearLocal(): void {
    this.favorites.set([]);
  }
}
