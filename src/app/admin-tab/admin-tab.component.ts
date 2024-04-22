import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { AdminPopupComponent } from '../admin-popup/admin-popup.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; // Import BsModalRef and BsModalService

@Component({
  selector: 'app-admin-tab',
  templateUrl: './admin-tab.component.html',
  styleUrls: ['./admin-tab.component.css']
})
export class AdminTabComponent implements OnInit {
  bsModalRef: BsModalRef | undefined;

  @Input() tabs: { title: string, content: string }[] = [];
  userData: { isactive: any; id: string, name: string, email: string, status: string, role: string, action: string }[] = [];
  selectedIndex: number = 0;
  isLoading: boolean = true;

  constructor(private sharedService: SharedService, private modalService: BsModalService) { } // Inject BsModalService

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.sharedService.getUserData().subscribe(
      (data: any) => {
        if (data && data.user) {
          this.userData = data.user.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status,
            role: user.role,
            action: ''
          }));
        }
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching user data:', error);
        this.isLoading = false;
      }
    );
  }

  selectTab(index: number) {
    this.selectedIndex = index;
  }

  updateUser(userId: string) {
    console.log(`Updating user with ID: ${userId}`);
    // Implement your update logic here
  }

  openAdminPopup(element: any): void {
    this.bsModalRef = this.modalService.show(AdminPopupComponent); // Open modal and get modal reference
  }
}
