import { SharedService } from '../shared.service';
import { AdminPopupComponent } from '../admin-popup/admin-popup.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {


  @Input() user: any;

  bsModalRef: BsModalRef | undefined;
  userData: any[] = []; // Remove interface and use 'any' for userData
  isLoading: boolean = true;

  constructor(private sharedService: SharedService, private modalService: BsModalService) { }

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.sharedService.getUserData().subscribe(
      (data: any) => {
        if (data && data.user) {
          this.userData = data.user;
        }
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching user data:', error);
        this.isLoading = false;
      }
    );
  }

  updateUser(userId: string) {
    console.log(`Updating user with ID: ${userId}`);
    // Implement your update logic here
  }

  openAdminPopup(user: any): void {
    const initialState = { userData: user }; // This should match the @Input() property name in AdminPopupComponent
    this.bsModalRef = this.modalService.show(AdminPopupComponent, { initialState });
  }
}



