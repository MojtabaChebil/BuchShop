import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = signal(false);
  errorMsg = signal('');

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMsg.set('Bitte fülle alle Felder aus.');
      return;
    }
    if (this.password.length < 6) {
      this.errorMsg.set('Das Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMsg.set('Die Passwörter stimmen nicht überein.');
      return;
    }

    this.loading.set(true);
    this.errorMsg.set('');

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.toastService.show(`Willkommen, ${this.name}!`, 'success');
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMsg.set(err.error?.message || 'Registrierung fehlgeschlagen. Bitte versuch es erneut.');
      }
    });
  }
}
