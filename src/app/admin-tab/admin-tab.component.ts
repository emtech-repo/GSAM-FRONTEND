import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-tab',
  templateUrl: './admin-tab.component.html',
  styleUrl: './admin-tab.component.css'
})
export class AdminTabComponent {


  @Input() tabs: { title: string, content: string }[] = [];
  @Input() userData: any[] = []; // this is where the userdata method
  selectedIndex: number = 0;

  selectTab(index: number) {
    this.selectedIndex = index;
  }

  // Define the updateuser method to handle user updates
  updateuser(userId: number) {
    // Implement your logic to update the user here
    console.log(`Updating user with ID: ${userId}`);
  }
}
