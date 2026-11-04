import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="footer">
      <div class="container footer-inner">
        <p>© {{ year }} BuchShop — Mini-Projekt für den Online-Buchverkauf</p>
        <p class="footer-tech">Gebaut mit Angular &amp; Node.js</p>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: var(--color-primary-dark);
        color: rgba(253, 248, 238, 0.75);
        margin-top: 64px;
      }

      .footer-inner {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 8px;
        padding: 26px 24px;
        font-size: 0.82rem;
      }

      .footer-tech {
        opacity: 0.75;
      }
    `
  ]
})
export class Footer {
  year = new Date().getFullYear();
}
