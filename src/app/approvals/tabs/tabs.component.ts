import { Component, Input } from '@angular/core';

interface Tabs {
  label: string;
  template: any; // Or use a template reference
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabComponent {
  @Input() tabs: Tabs[] = [];
  selectedTabIndex = 0;

  selectTab(index: number) {
    this.selectedTabIndex = index;
  }
}
