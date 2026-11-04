import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <span class="not-found-code">404</span>
      <h1>Diese Seite gibt es nicht.</h1>
      <p>Vielleicht wurde sie verschoben oder existiert nicht mehr.</p>
      <a routerLink="/" class="btn btn-primary">Zurück zur Startseite</a>
    </div>
  `,
  styles: [
    `
      .not-found {
        text-align: center;
        padding: 110px 24px;
      }

      .not-found-code {
        display: block;
        font-family: var(--font-display);
        font-size: 5rem;
        font-weight: 700;
        color: var(--color-primary);
        line-height: 1;
        margin-bottom: 12px;
      }

      .not-found h1 {
        margin-bottom: 8px;
      }

      .not-found p {
        color: var(--color-text-muted);
        margin-bottom: 28px;
      }
    `
  ]
})
export class NotFound {}
