import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reports-inter',
  templateUrl: './reports-inter.component.html',
  styleUrl: './reports-inter.component.css'
})
export class ReportsInterComponent implements OnInit {


  searchQuery: string = ''; // Search query
  showDropdown: boolean = false; // Flag to show/hide dropdown
  items: any[] = [
    {
      title: "create case",
      path: "../../../case-management/app-create-case"
    },
     {
      title: "Search case",
      path: "../../../case-management/app-search-case"
    },
     {
      title: " case status",
      path: "../../../case-management/app-case-status"
    },
     {
      title: "documentation",
      path: "../../../case-management/app-documentation"
    },
     {
      title: "create meeting",
      path: "../../../case-management/app-create-meeting"
    },
     {
      title: "case tracking",
      path: "../../../case-management/app-case-tracking"
    },
    {
      title: "case decision",
      path: "../../../case-management/app-case-decision"
    },
    
     {
      title: "update user",
      path: "../../../app-admin-page"
    },
    
     {
      title: "assign case",
      path: "../../../case-management/app-assign-case"
    },
     {
      title: "view claim",
      path: "../../../billing-reconciliation/app-view-claims"
    },
     {
      title: "create claim",
      path: "../../../billing-reconciliation/app-create-claim"
    },
     {
      title: "request service",
      path: "../../../billing-reconciliation/request-service"
    },
      {
      title: " view request ",
      path: "../../../billing-reconciliation/app-view-requests"
    },
     {
      title: "contracts ",
      path: "../../../contracts/app-contract-inter"
    },
    
     {
      title: " reports ",
      path: "../../../'reports/app-reports-inter"
    },
     {
      title: " search document ",
      path: "../../../documents/app-search-document"
    },
     {
      title: "retrieve document ",
      path: "../../../documents/app-retrieve"
    },
     {
      title: " request document ",
      path: "../../../documents/app-request"
    },
     {
      title: " upload document ",
      path: "../../../documents/app-upload"
    },
    
    
    
    
    
    
    
    
    

   
  ]; // Sidebar items
  filteredItems: any[] = []; // Filtered items
  isRising: boolean = false; // Property for card rising effect

constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.filteredItems = this.items; // Initially, show all items
  }

  // Method to filter items based on search query
  // Method to filter items based on search query
  filterItems(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredItems = this.items; // If search query is empty, show all items
      this.showDropdown = false; // Hide dropdown
      return;
    }

    // Filter items based on search query
    const lowercaseQuery = this.searchQuery.toLowerCase();
    this.filteredItems = this.items.filter(item =>
      item.title.toLowerCase().includes(lowercaseQuery)
    );

    console.log('Filtered Items:', this.filteredItems); // Debugging output

    this.showDropdown = true; // Show dropdown
  }

  // Method to handle card rising effect
  riseCard(rising: boolean) {
    this.isRising = rising;
  }

  // Method to navigate to the selected page
  navigateToPage(item: any): void {
    this.router.navigate([item.path]); // Redirect to the specified path
  }
 

}
