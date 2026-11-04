import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/cart';
import { FavoritesService } from '../../services/favorites';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  loading = signal(false);
  errorMsg = signal('');

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private favoritesService: FavoritesService,
    private toastService: ToastService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMsg.set('Bitte fülle alle Felder aus.');
      return;
    }

    this.loading.set(true);
    this.errorMsg.set('');

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.cartService.loadCart().subscribe();
        this.favoritesService.loadFavorites().subscribe();
        this.toastService.show('Willkommen zurück!', 'success');
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMsg.set(err.error?.message || 'Login fehlgeschlagen. Bitte versuch es erneut.');
      }
    });
  }
}
