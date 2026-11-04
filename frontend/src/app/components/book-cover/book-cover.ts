import { Component, input, computed } from '@angular/core';

// Jede Kategorie bekommt eine eigene Farbkombination fuer den "Einband".
const CATEGORY_COLORS: Record<string, [string, string]> = {
  Dystopie: ['#2c3e50', '#4a6278'],
  Klassiker: ['#1e4842', '#2e6058'],
  Abenteuer: ['#2d5f3e', '#417a55'],
  Krimi: ['#1a1a2e', '#3d3d5c'],
  Horror: ['#3d0f0f', '#5c1f1f'],
  Kinderbuch: ['#a8432e', '#c25a3f'],
  Drama: ['#4a235a', '#6c3483'],
  Philosophie: ['#5d4037', '#7a5c50']
};

const DEFAULT_COLORS: [string, string] = ['#1e4842', '#2e6058'];

@Component({
  selector: 'app-book-cover',
  imports: [],
  templateUrl: './book-cover.html',
  styleUrl: './book-cover.css'
})
export class BookCover {
  title = input.required<string>();
  author = input.required<string>();
  category = input<string>('');

  gradient = computed(() => {
    const colors = CATEGORY_COLORS[this.category()] || DEFAULT_COLORS;
    return `linear-gradient(160deg, ${colors[0]}, ${colors[1]})`;
  });
}
