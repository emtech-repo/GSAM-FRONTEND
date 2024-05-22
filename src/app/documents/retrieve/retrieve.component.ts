import { Component, Renderer2, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html',
  styleUrls: ['./retrieve.component.css']
})
export class RetrieveComponent implements AfterViewInit {
  isModalVisible = false;
  modalElement?: HTMLElement;

  constructor(private renderer: Renderer2, private el: ElementRef, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalElement = this.el.nativeElement.querySelector('#myModal');
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

  toggleModal() {
    if (this.isModalVisible) {
      this.hideModal();
    } else {
      this.showModal();
    }
  }

  showModal() {
    if (this.modalElement) {
      this.renderer.addClass(this.modalElement, 'show');
    }
  }

  hideModal() {
    if (this.modalElement) {
      this.renderer.removeClass(this.modalElement, 'show');
    }
  }
}
