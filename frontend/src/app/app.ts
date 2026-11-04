import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { ToastContainer } from './components/toast-container/toast-container';
import { AuthService } from './services/auth';
import { CartService } from './services/cart';
import { FavoritesService } from './services/favorites';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    // Falls noch ein Login-Token aus einer frueheren Sitzung vorhanden ist,
    // Warenkorb und Favoriten direkt beim Start laden.
    if (this.authService.isLoggedIn()) {
      this.cartService.loadCart().subscribe();
      this.favoritesService.loadFavorites().subscribe();
    }
  }
}
