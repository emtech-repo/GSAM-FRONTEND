import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-inter',
  templateUrl: './contract-inter.component.html',
  styleUrl: './contract-inter.component.css'
})
export class ContractInterComponent  {
  activeTab: string = 'general'


  setActiveTab (tab: string ): void {
    this.activeTab =tab;
  }

  
}
