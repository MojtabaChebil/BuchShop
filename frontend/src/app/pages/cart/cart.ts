import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { ToastService } from '../../services/toast';
import { BookCover } from '../../components/book-cover/book-cover';
import { Order } from '../../models/order';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, BookCover],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  loading = signal(true);
  checkingOut = signal(false);
  placedOrder = signal<Order | null>(null);

  constructor(
    public cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.cartService.loadCart().subscribe({
      next: () => this.loading.set(false),
      error: () => this.loading.set(false)
    });
  }

  increase(bookId: string, currentQty: number): void {
    this.cartService.updateQuantity(bookId, currentQty + 1).subscribe();
  }

  decrease(bookId: string, currentQty: number): void {
    if (currentQty <= 1) return;
    this.cartService.updateQuantity(bookId, currentQty - 1).subscribe();
  }

  remove(bookId: string): void {
    this.cartService.removeItem(bookId).subscribe({
      next: () => this.toastService.show('Artikel entfernt.', 'info')
    });
  }

  checkout(): void {
    this.checkingOut.set(true);
    this.cartService.checkout().subscribe({
      next: (res) => {
        this.checkingOut.set(false);
        this.placedOrder.set(res.order);
        this.toastService.show('Bestellung erfolgreich aufgegeben!', 'success');
      },
      error: () => {
        this.checkingOut.set(false);
        this.toastService.show('Bestellung fehlgeschlagen. Bitte versuch es erneut.', 'error');
      }
    });
  }
}
