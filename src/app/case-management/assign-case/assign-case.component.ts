import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-case',
  templateUrl: './assign-case.component.html',
  styleUrl: './assign-case.component.css'
})
export class AssignCaseComponent {
  
  constructor(private router: Router) {}

  goToCaseDetails() {
    // Navigate to the "case-details" route
    this.router.navigate(['/case-details']);
  }
  
}
