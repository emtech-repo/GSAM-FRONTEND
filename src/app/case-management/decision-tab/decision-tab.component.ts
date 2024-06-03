import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { RecoveryFormComponent } from '../recovery-form/recovery-form.component';
import { RefinanceFormComponent } from '../refinance-form/refinance-form.component';
import { RestructureFormComponent } from '../restructure-form/restructure-form.component';

@Component({
  selector: 'app-decision-tab',
  templateUrl: './decision-tab.component.html',
  styleUrls: ['./decision-tab.component.css']
})
export class DecisionTabComponent {

  currentPage: number = 1;
  dataSource: any[] = [];
  dataSourceFiltered: any[] = [];
  Assigneddata: any[] = [];
  AssignedUrl: string = '';
  @Input() loanAccount: any = '';

  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router, private sharedService: SharedService,
    public bsModalRef: BsModalRef, private http: HttpClient, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.AssignedUrl = this.sharedService.AssignedUrl;
    this.getAssigned();
  }

  selectTab(index: number) {
    this.selectedIndex = index;
  }

  getAssigned(): void {
    this.http.get<any>(this.AssignedUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.Assigneddata = response.result;
        this.dataSource = this.Assigneddata;
        this.dataSourceFiltered = this.dataSource; // Initialize filtered data
      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value.toLowerCase();
    if (filterValue.trim() === '') {
      this.dataSourceFiltered = this.dataSource;
    } else {
      this.dataSourceFiltered = this.dataSource.filter(item => item.loanAccount.toLowerCase().includes(filterValue));
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToRecoveryForm(loanAccount: any): void {
    this.bsModalRef = this.modalService.show(RecoveryFormComponent, { 
      initialState: { loanAccount: loanAccount }  
    });
  }

  goToRefinanceForm(loanAccount: any): void {
    this.bsModalRef = this.modalService.show(RefinanceFormComponent, { 
      initialState: { loanAccount: loanAccount }  
    });
  }

  goToRestructureForm(loanAccount: any): void {
    this.bsModalRef = this.modalService.show(RestructureFormComponent, { 
      initialState: { loanAccount: loanAccount }  
    });
  }
}
