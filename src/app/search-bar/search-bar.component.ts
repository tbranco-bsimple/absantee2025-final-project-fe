import { CommonModule } from '@angular/common';
import { Component, Input, signal, Signal, computed, WritableSignal, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent<T> implements OnInit {
  @Input() itemsSignal!: Signal<T[]>;
  @Input() filterKeys!: string[];

  searchTerms: Record<string, WritableSignal<string>> = {};

  ngOnInit(): void {
    for (const key of this.filterKeys) {
      this.searchTerms[key] = signal('');
    }
  }

  filteredItems = computed(() => {
    const items = this.itemsSignal();

    return items.filter(item =>
      this.filterKeys.every(key => {
        const term = this.searchTerms[key]?.().toLowerCase() ?? '';
        const value = String(this.getValueByPath(item, key) ?? '').toLowerCase();
        return value.includes(term);
      })
    );
  });

  onInputChange(key: string, event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (this.getInputType(key) === 'date') {
      const date = new Date(value);
      value = isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
    }

    this.searchTerms[key]?.set(value);
  }

  formatKey(key: string): string {
    const parts = key.split('.');
    const last = parts[parts.length - 1];
    return last.charAt(0).toUpperCase() + last.slice(1);
  }

  getInputType(key: string): 'text' | 'date' {
    const items = this.itemsSignal();
    if (!items.length) return 'text';

    const value = this.getValueByPath(items[0], key);
    if (value instanceof Date) return 'date';
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return 'date';

    return 'text';
  }

  private getValueByPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }
}