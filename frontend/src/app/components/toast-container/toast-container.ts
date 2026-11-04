import { Component } from '@angular/core';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-toast-container',
  imports: [],
  template: `
    <div class="toast-stack">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast" [class]="'toast-' + toast.type" (click)="toastService.dismiss(toast.id)">
          {{ toast.message }}
        </div>
      }
    </div>
  `,
  styles: [
    `
      .toast-stack {
        position: fixed;
        top: 84px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 320px;
      }

      .toast {
        padding: 14px 18px;
        border-radius: 10px;
        color: #fdf8ee;
        font-family: var(--font-body);
        font-size: 0.88rem;
        font-weight: 500;
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        animation: toast-in 0.22s ease;
      }

      .toast-success {
        background: var(--color-success);
      }
      .toast-error {
        background: var(--color-error);
      }
      .toast-info {
        background: var(--color-primary);
      }

      @keyframes toast-in {
        from {
          transform: translateX(30px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @media (max-width: 760px) {
        .toast-stack {
          left: 16px;
          right: 16px;
          max-width: none;
        }
      }
    `
  ]
})
export class ToastContainer {
  constructor(public toastService: ToastService) {}
}
