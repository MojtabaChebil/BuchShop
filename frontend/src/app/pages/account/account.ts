import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth';
import { OrderService } from '../../services/order';
import { Order } from '../../models/order';

@Component({
  selector: 'app-account',
  imports: [DatePipe],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account implements OnInit {
  orders = signal<Order[]>([]);
  loading = signal(true);

  constructor(
    public authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (res) => {
        this.orders.set(res.orders);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
