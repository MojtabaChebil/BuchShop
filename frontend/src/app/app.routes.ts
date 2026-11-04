import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BookDetail } from './pages/book-detail/book-detail';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Cart } from './pages/cart/cart';
import { Favorites } from './pages/favorites/favorites';
import { Account } from './pages/account/account';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home, title: 'BuchShop – Startseite' },
  { path: 'buch/:id', component: BookDetail, title: 'BuchShop – Buchdetails' },
  { path: 'login', component: Login, title: 'BuchShop – Login' },
  { path: 'registrieren', component: Register, title: 'BuchShop – Registrieren' },
  { path: 'warenkorb', component: Cart, canActivate: [authGuard], title: 'BuchShop – Warenkorb' },
  { path: 'favoriten', component: Favorites, canActivate: [authGuard], title: 'BuchShop – Favoriten' },
  { path: 'konto', component: Account, canActivate: [authGuard], title: 'BuchShop – Mein Konto' },
  { path: '**', component: NotFound, title: 'BuchShop – Seite nicht gefunden' }
];
