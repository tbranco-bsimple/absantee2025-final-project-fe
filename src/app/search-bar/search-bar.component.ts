import { Component, Input, effect, signal, Signal } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent<T> {
  @Input() itemsSignal!: Signal<T[]>;
  @Input() filterKey!: keyof T;
  @Input() setFiltered!: (value: T[]) => void;

  searchTerm = signal('');

  constructor() {
    effect(() => {
      const term = this.searchTerm().toLowerCase();
      const allItems = this.itemsSignal();

      const filtered = allItems.filter(item => {
        const value = String(item[this.filterKey] ?? '').toLowerCase();
        return value.includes(term);
      });

      this.setFiltered(filtered);
    });
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement | null;
    this.searchTerm.set(input?.value ?? '');
  }

}
