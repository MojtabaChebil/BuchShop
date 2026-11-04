import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { API_URL } from '../core/api-config';

@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(search?: string, category?: string): Observable<{ books: Book[] }> {
    const query: string[] = [];
    if (search) query.push(`search=${encodeURIComponent(search)}`);
    if (category) query.push(`category=${encodeURIComponent(category)}`);
    const qs = query.length ? `?${query.join('&')}` : '';
    return this.http.get<{ books: Book[] }>(`${API_URL}/books${qs}`);
  }

  getBook(id: string): Observable<{ book: Book }> {
    return this.http.get<{ book: Book }>(`${API_URL}/books/${id}`);
  }

  getCategories(): Observable<{ categories: string[] }> {
    return this.http.get<{ categories: string[] }>(`${API_URL}/books/categories`);
  }
}
