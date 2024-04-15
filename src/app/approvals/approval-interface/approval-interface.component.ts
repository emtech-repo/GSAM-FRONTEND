import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatTabsModule } from '@angular/material/tabs'; // Import MatTabsModule


@Component({
  selector: 'app-approval-interface',
  templateUrl: './approval-interface.component.html',
  styleUrls: ['./approval-interface.component.css'] // Correct property name is styleUrls
})
export class ApprovalInterfaceComponent {

}

@NgModule({
  declarations: [
    ApprovalInterfaceComponent
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    TabsModule.forRoot(),
    MatTabsModule,
    // Other module imports if needed
  ],
  exports: [
    ApprovalInterfaceComponent
  ]
})
export class ApprovalInterfaceModule { }
