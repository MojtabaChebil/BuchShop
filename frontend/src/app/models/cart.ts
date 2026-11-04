import { Book } from './book';

export interface CartItem {
  book: Book;
  quantity: number;
  subtotal: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}
