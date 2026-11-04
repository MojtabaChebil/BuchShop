import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { API_URL } from '../core/api-config';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<{ orders: Order[] }> {
    return this.http.get<{ orders: Order[] }>(`${API_URL}/orders`);
  }
}
