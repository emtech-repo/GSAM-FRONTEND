import { Component,Input, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
@Input() modalTitle: string='';
 modalRef!: NgbModalRef;

 constructor(private modalService: NgbModal) {}

 open(content:TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
 }

 close() {
    this.modalRef.close();
 }
}
