import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../services/favorites';
import { CartService } from '../../services/cart';
import { ToastService } from '../../services/toast';
import { BookCard } from '../../components/book-card/book-card';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink, BookCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites implements OnInit {
  loading = signal(true);

  constructor(
    public favoritesService: FavoritesService,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.favoritesService.loadFavorites().subscribe({
      next: () => this.loading.set(false),
      error: () => this.loading.set(false)
    });
  }

  onAddToCart(bookId: string): void {
    this.cartService.addToCart(bookId).subscribe({
      next: () => this.toastService.show('Zum Warenkorb hinzugefügt!', 'success'),
      error: () => this.toastService.show('Hinzufügen fehlgeschlagen.', 'error')
    });
  }

  onToggleFavorite(bookId: string): void {
    this.favoritesService.toggleFavorite(bookId).subscribe({
      next: () => this.toastService.show('Aus Favoriten entfernt.', 'info')
    });
  }
}
