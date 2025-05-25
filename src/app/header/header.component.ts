import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() tabSelected = new EventEmitter<'users' | 'projects' | 'holiday-plans' | 'assocations-proj-collab'>();

  selectTab(tab: 'users' | 'projects' | 'holiday-plans' | 'assocations-proj-collab') {
    this.tabSelected.emit(tab);
  }

}
