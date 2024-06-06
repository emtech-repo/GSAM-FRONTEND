import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css']
})
export class RequestServiceComponent implements OnInit {
  serviceForm: FormGroup;
  serviceProviders: any[] = [];
  filteredServiceProviders: any[] = [];
  requestId: string | null = null;
  SubmittedSuccessfully: boolean = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private sharedService: SharedService) {
    this.serviceForm = this.fb.group({
      searchParam: ['id'],
      searchValue: [''],
      serviceName: [''],
      region: [''],
      service: [''],
      serviceProvider: [''],
      serviceProviderId: [''],
      postalAddress: [''],
      telephone: [''],
      email: [''],
      serviceDate: [''],
      serviceId: [''],
      regionId: [''],
      accountNumber: [''],
      Comments: [''],
    });
  }

  ngOnInit(): void {
    this.fetchServiceProviders();
  }

  fetchServiceProviders(): void {
    this.sharedService.getServiceProviders().subscribe(
      response => {
        if (response.statusCode === 200) {
          this.serviceProviders = response.result;
          this.filteredServiceProviders = this.serviceProviders;
        } else {
          console.error('Failed to fetch service providers:', response.message);
        }
      },
      error => {
        console.error('Error fetching service providers:', error);
      }
    );
  }

  search(): void {
    const searchParam = this.serviceForm.get('searchParam')?.value;
    const searchValue = this.serviceForm.get('searchValue')?.value;

    if (searchParam === 'id') {
      this.filteredServiceProviders = this.serviceProviders.filter(provider => provider.id === +searchValue);
    } else if (searchParam === 'name') {
      this.filteredServiceProviders = this.serviceProviders.filter(provider =>
        provider.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (this.filteredServiceProviders.length > 0) {
      const selectedProvider = this.filteredServiceProviders[0];
      this.serviceForm.patchValue({
        serviceId: selectedProvider.service.id,
        serviceProviderId: selectedProvider.id,
        serviceName: selectedProvider.service.serviceName,
        regionId: selectedProvider.region.id,
        region: selectedProvider.region.regionName,
        serviceProvider: selectedProvider.name,
        postalAddress: selectedProvider.postal,
        telephone: selectedProvider.phoneNumber,
        email: selectedProvider.email,
        accountNumber: selectedProvider.accountNumber,
        Comments: selectedProvider.Comments
      });
    }
  }

  onSubmit(): void {
    this.SubmittedSuccessfully = false;
    this.errorMessage = null;

    if (this.serviceForm.valid) {
      const submitData = {
        ServiceId: this.serviceForm.get('serviceId')?.value,
        ServiceProviderId: this.serviceForm.get('serviceProviderId')?.value,
        RegionId: this.serviceForm.get('regionId')?.value,
        ProviderEmail: this.serviceForm.get('email')?.value,
        ProviderPostal: this.serviceForm.get('postalAddress')?.value,
        ProviderPhoneNumber: this.serviceForm.get('telephone')?.value,
        ProviderAccountNumber: this.serviceForm.get('accountNumber')?.value,
        ServiceDate: this.serviceForm.get('serviceDate')?.value,
        Comments: this.serviceForm.get('Comments')?.value,
      };

      this.sharedService.submitData(submitData).subscribe(
        (response: any) => {
          if (response.statusCode === 200 && response.requestId) {
            this.requestId = response.requestId;
            this.SubmittedSuccessfully = true;
            // alert(Service request submitted successfully! Your request ID is: ${ this.requestId });
          } else {
            this.errorMessage = response.message || 'Failed to submit service request.';
          }
        },
        error => {
          this.errorMessage = 'Error submitting data: ' + error.message;
        }
      );
    }
  }
}