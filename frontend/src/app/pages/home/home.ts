import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';
import { CartService } from '../../services/cart';
import { FavoritesService } from '../../services/favorites';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';
import { Book } from '../../models/book';
import { BookCard } from '../../components/book-card/book-card';
import { BookCover } from '../../components/book-cover/book-cover';

@Component({
  selector: 'app-home',
  imports: [FormsModule, BookCard, BookCover],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  books = signal<Book[]>([]);
  categories = signal<string[]>([]);
  loading = signal(true);
  searchTerm = '';
  selectedCategory = '';

  // Ein paar Cover fuer die "angelehnten Buecher" im Hero-Bereich.
  heroBooks = signal<Book[]>([]);

  constructor(
    private bookService: BookService,
    public cartService: CartService,
    public favoritesService: FavoritesService,
    public authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBooks(true);

    this.bookService.getCategories().subscribe((res) => this.categories.set(res.categories));

    if (this.authService.isLoggedIn()) {
      this.favoritesService.loadFavorites().subscribe();
    }
  }

  loadBooks(isInitial = false): void {
    this.loading.set(true);
    this.bookService.getBooks(this.searchTerm, this.selectedCategory).subscribe({
      next: (res) => {
        this.books.set(res.books);
        this.loading.set(false);
        if (isInitial) {
          this.heroBooks.set(res.books.slice(0, 5));
        }
      },
      error: () => this.loading.set(false)
    });
  }

  onSearch(): void {
    this.loadBooks();
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    this.loadBooks();
  }

  scrollToCatalog(): void {
    document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
  }

  onAddToCart(bookId: string): void {
    if (!this.authService.isLoggedIn()) {
      this.toastService.show('Bitte melde dich an, um Bücher zu kaufen.', 'info');
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(bookId).subscribe({
      next: () => this.toastService.show('Zum Warenkorb hinzugefügt!', 'success'),
      error: () => this.toastService.show('Hinzufügen fehlgeschlagen.', 'error')
    });
  }

  onToggleFavorite(bookId: string): void {
    if (!this.authService.isLoggedIn()) {
      this.toastService.show('Bitte melde dich an, um Favoriten zu speichern.', 'info');
      this.router.navigate(['/login']);
      return;
    }
    const wasFavorite = this.favoritesService.isFavorite(bookId);
    this.favoritesService.toggleFavorite(bookId).subscribe({
      next: () =>
        this.toastService.show(wasFavorite ? 'Aus Favoriten entfernt.' : 'Zu Favoriten hinzugefügt!', 'success')
    });
  }

  isFavorite(bookId: string): boolean {
    return this.favoritesService.isFavorite(bookId);
  }
}
