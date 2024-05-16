import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-claim-tab',
  templateUrl: './claim-tab.component.html',
  styleUrl: './claim-tab.component.css'
})
export class ClaimTabComponent {



  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;


  selectTab(index: number) {
    this.selectedIndex = index;
  }


  

}
