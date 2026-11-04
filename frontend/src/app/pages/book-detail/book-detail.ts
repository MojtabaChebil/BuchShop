import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book';
import { CartService } from '../../services/cart';
import { FavoritesService } from '../../services/favorites';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';
import { Book } from '../../models/book';
import { BookCover } from '../../components/book-cover/book-cover';

@Component({
  selector: 'app-book-detail',
  imports: [RouterLink, BookCover],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail implements OnInit {
  book = signal<Book | null>(null);
  loading = signal(true);
  notFound = signal(false);
  quantity = signal(1);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    public cartService: CartService,
    public favoritesService: FavoritesService,
    public authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.notFound.set(true);
      this.loading.set(false);
      return;
    }

    this.bookService.getBook(id).subscribe({
      next: (res) => {
        this.book.set(res.book);
        this.loading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.loading.set(false);
      }
    });

    if (this.authService.isLoggedIn()) {
      this.favoritesService.loadFavorites().subscribe();
    }
  }

  increaseQty(): void {
    this.quantity.update((q) => q + 1);
  }

  decreaseQty(): void {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  addToCart(): void {
    if (!this.authService.isLoggedIn()) {
      this.toastService.show('Bitte melde dich an, um Bücher zu kaufen.', 'info');
      this.router.navigate(['/login']);
      return;
    }
    const b = this.book();
    if (!b) return;

    this.cartService.addToCart(b.id, this.quantity()).subscribe({
      next: () => this.toastService.show(`"${b.title}" wurde zum Warenkorb hinzugefügt!`, 'success'),
      error: () => this.toastService.show('Hinzufügen fehlgeschlagen.', 'error')
    });
  }

  toggleFavorite(): void {
    if (!this.authService.isLoggedIn()) {
      this.toastService.show('Bitte melde dich an, um Favoriten zu speichern.', 'info');
      this.router.navigate(['/login']);
      return;
    }
    const b = this.book();
    if (!b) return;

    const wasFavorite = this.favoritesService.isFavorite(b.id);
    this.favoritesService.toggleFavorite(b.id).subscribe({
      next: () =>
        this.toastService.show(wasFavorite ? 'Aus Favoriten entfernt.' : 'Zu Favoriten hinzugefügt!', 'success')
    });
  }

  isFavorite(): boolean {
    const b = this.book();
    return b ? this.favoritesService.isFavorite(b.id) : false;
  }
}
