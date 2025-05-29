import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() tabSelected = new EventEmitter<'collaborators' | 'projects'>();

  selectTab(tab: 'collaborators' | 'projects') {
    this.tabSelected.emit(tab);
  }

}
