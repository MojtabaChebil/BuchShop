import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CartState } from '../models/cart';
import { Order } from '../models/order';
import { API_URL } from '../core/api-config';

const EMPTY_CART: CartState = { items: [], total: 0 };

@Injectable({ providedIn: 'root' })
export class CartService {
  cart = signal<CartState>(EMPTY_CART);
  itemCount = computed(() => this.cart().items.reduce((sum, i) => sum + i.quantity, 0));

  constructor(private http: HttpClient) {}

  loadCart(): Observable<CartState> {
    return this.http.get<CartState>(`${API_URL}/cart`).pipe(tap((res) => this.cart.set(res)));
  }

  addToCart(bookId: string, quantity = 1): Observable<CartState> {
    return this.http
      .post<CartState>(`${API_URL}/cart`, { bookId, quantity })
      .pipe(tap((res) => this.cart.set(res)));
  }

  updateQuantity(bookId: string, quantity: number): Observable<CartState> {
    return this.http
      .put<CartState>(`${API_URL}/cart/${bookId}`, { quantity })
      .pipe(tap((res) => this.cart.set(res)));
  }

  removeItem(bookId: string): Observable<CartState> {
    return this.http
      .delete<CartState>(`${API_URL}/cart/${bookId}`)
      .pipe(tap((res) => this.cart.set(res)));
  }

  checkout(): Observable<{ order: Order }> {
    return this.http
      .post<{ order: Order }>(`${API_URL}/cart/checkout`, {})
      .pipe(tap(() => this.cart.set(EMPTY_CART)));
  }

  clearLocal(): void {
    this.cart.set(EMPTY_CART);
  }
}
