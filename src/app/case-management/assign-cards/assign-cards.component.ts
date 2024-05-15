import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-assign-cards',
  templateUrl: './assign-cards.component.html',
  styleUrl: './assign-cards.component.css'
})
export class AssignCardsComponent {

   constructor(private router: Router) { }


   goToAssignedCases() {
    // Navigate to the "assigned cases" route
    this.router.navigate(['/app-assigned-cases']);
   
  }
  goToAssignCase() {
    // Navigate to the "assigned cases" route
    this.router.navigate(['/app-assign-case']);
   
  }


}
