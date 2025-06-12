import { CommonModule } from '@angular/common';
import { Component, Input, signal, Signal, computed, WritableSignal, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent<T> implements OnInit {
  @Input() itemsSignal!: Signal<T[]>;
  @Input() filterKeys!: (keyof T)[];

  searchTerms: { [K in keyof T]?: WritableSignal<string> } = {};

  ngOnInit(): void {
    for (const key of this.filterKeys) {
      if (!this.searchTerms[key]) {
        this.searchTerms[key] = signal('');
      }
    }
  }

  filteredItems = computed(() => {
    const items = this.itemsSignal();

    return items.filter(item =>
      this.filterKeys.every(key => {
        const term = this.searchTerms[key]?.().toLowerCase() ?? '';
        const value = String(item[key] ?? '').toLowerCase();
        return value.includes(term);
      })
    );
  });

  onInputChange(key: keyof T, event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerms[key]?.set(input?.value ?? '');
  }
}
