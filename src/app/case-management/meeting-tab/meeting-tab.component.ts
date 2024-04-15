import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-meeting-tab',
  templateUrl: './meeting-tab.component.html',
  styleUrl: './meeting-tab.component.css'
})
export class MeetingTabComponent {

  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;

  selectTab(index: number) {
    this.selectedIndex = index;
  }

}
