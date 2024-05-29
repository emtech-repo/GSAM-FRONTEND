import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrl: './request-service.component.css'
})
export class RequestServiceComponent {
  serviceForm: FormGroup;

  constructor(private fb: FormBuilder, private sharedService: SharedService) {
    this.serviceForm = this.fb.group({
      serviceId: [''],
      regionId: [''],
      serviceProviderId: [''],
      providerPhoneNumber: [''],
      providerAccountNumber: [''],
      providerEmail: [''],
      providerPostal: [''],
      serviceName: [''],
      region: [''],
      serviceProvider: [''],
      postalAddress: [''],
      telephone: [''],
      email: [''],
      serviceDate: [''],
      claimDetails: ['']
    });
  }

  ngOnInit(): void {
    this.sharedService.getServiceData().subscribe(data => {
      this.serviceForm.patchValue({
        serviceId: data.serviceId,
        regionId: data.regionId,
        serviceProviderId: data.serviceProviderId,
        providerPhoneNumber: data.providerPhoneNumber,
        providerAccountNumber: data.providerAccountNumber,
        providerEmail: data.providerEmail,
        providerPostal: data.providerPostal
      });
    });
  }
  onSubmit(): void {
  //   if (this.serviceForm.valid) {
  //     this.sharedService.submitServiceData(this.serviceForm.value).subscribe((response: any) => {
  //       console.log('Data submitted successfully!', response);
  //     });
  //   }
  // }
}
}

