import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-tab',
  templateUrl: './admin-tab.component.html',
  styleUrl: './admin-tab.component.css'
})
export class AdminTabComponent {
  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;

  selectTab(index: number) {
    this.selectedIndex = index;
  }

}
