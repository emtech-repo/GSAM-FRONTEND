import { Component } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reports-inter',
  templateUrl: './reports-inter.component.html',
  styleUrls: ['./reports-inter.component.css']
})
export class ReportsInterComponent  {
  selectedFunction: string = 'choose option';
  selectedLoanAccount: string = '';

  activeTab: string = 'viewContract';
  searchParams: { param: string, value: string } = { param: '', value: '' }; 

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  exportToPDF() {
    const doc = new jsPDF();

    const reportName = (document.getElementById('exampleFormControlInput1') as HTMLInputElement).value;
    const cifId = (document.querySelector('input[for="inputcifid"]') as HTMLInputElement).value;
    const caseNumber = (document.querySelector('input[for="inputEmail4"]') as HTMLInputElement).value;
    const loanAccount = (document.getElementById('AccNumber') as HTMLInputElement).value;
    const startDate = (document.querySelectorAll('input[type="date"]')[0] as HTMLInputElement).value;
    const accName = (document.querySelector('input[for="inputEmail4"]') as HTMLInputElement).value;
    const endDate = (document.querySelectorAll('input[type="date"]')[1] as HTMLInputElement).value;

    doc.text(`Report Name: ${reportName}`, 10, 10);
    doc.text(`CIF ID: ${cifId}`, 10, 20);
    doc.text(`Case Number: ${caseNumber}`, 10, 30);
    doc.text(`Loan Account: ${loanAccount}`, 10, 40);
    doc.text(`Start Date: ${startDate}`, 10, 50);
    doc.text(`Account Name: ${accName}`, 10, 60);
    doc.text(`End Date: ${endDate}`, 10, 70);

    doc.save('form-data.pdf');
  }

   applyFilter(event: any) {
    
  }
   onFunctionChange(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      const target = event.target as HTMLSelectElement;
      this.selectedFunction = target.value;
      this.selectedLoanAccount = ''; // Reset the selected loan account when the function changes


      if (this.selectedFunction === '5') {  // 5 corresponds to "INQUIRE"
       
       
      } else if (this.selectedFunction === '2') { 
         // 2 corresponds to "ADD"
        // Example route for ADD functionality
      }
      // Add other conditions for different options if needed
    }
  }
}
