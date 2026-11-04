import { HttpInterceptorFn } from '@angular/common/http';

// Haengt automatisch "Authorization: Bearer <token>" an jede ausgehende Anfrage an,
// falls ein Benutzer eingeloggt ist.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('buchshop_token');

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req);
};
