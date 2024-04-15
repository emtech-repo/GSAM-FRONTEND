import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-decision-tab',
  templateUrl: './decision-tab.component.html',
  styleUrl: './decision-tab.component.css'
})
export class DecisionTabComponent {

  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;

  selectTab(index: number) {
    this.selectedIndex = index;
  }



}
