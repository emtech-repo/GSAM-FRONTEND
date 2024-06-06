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
  requestId: string | null = null;  // To store the generated request ID
  SubmittedSuccessfully: boolean = false;
  errorMessage: string | null = null;


  constructor(private fb: FormBuilder, private sharedService: SharedService) {
    this.serviceForm = this.fb.group({
      searchParam: ['id'],
      searchValue: [''],
      serviceName: [''],
      region: [''],
      service: [''],
      serviceProvider: [0],
      serviceProviderId: [0],
      postalAddress: [''],
      telephone: [''],
      email: [''],
      serviceDate: [''],
      serviceId: [0],
      regionId: [0],
      accountNumber: [''],
      Comments: [''],
    });
    console.log('Initial form value:', this.serviceForm.value); // Debugging line
  }

  ngOnInit(): void {
    this.fetchServiceProviders();
  }

  fetchServiceProviders(): void {
    console.log('Fetching service providers...'); // Debugging line
    this.sharedService.getServiceProviders().subscribe(
      response => {
        console.log('Fetch service providers response:', response); // Debugging line
        if (response.statusCode === 200) {
          this.serviceProviders = response.result;
          this.filteredServiceProviders = this.serviceProviders;
          console.log('Service providers:', this.serviceProviders); // Debugging line
        } else {
          console.error('Failed to fetch service providers:', response.message); // Debugging line
        }
      },
      error => {
        console.error('Error fetching service providers:', error); // Debugging line
      }
    );
  }

  search(): void {
    const searchParam = this.serviceForm.get('searchParam')?.value;
    const searchValue = this.serviceForm.get('searchValue')?.value;
    console.log('Search params:', { param: searchParam, value: searchValue }); // Debugging line

    if (searchParam === 'id') {
      this.filteredServiceProviders = this.serviceProviders.filter(provider => provider.id === +searchValue);
    } else if (searchParam === 'name') {
      this.filteredServiceProviders = this.serviceProviders.filter(provider =>
        provider.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    console.log('Filtered service providers:', this.filteredServiceProviders); // Debugging line

    // Auto-fill form if there is at least one matching provider
    if (this.filteredServiceProviders.length > 0) {
      const selectedProvider = this.filteredServiceProviders[0];
      console.log('Selected provider:', selectedProvider); // Debugging line
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
      console.log('Form after patching value:', this.serviceForm.value); // Debugging line
    } else {
      console.log('No providers found for search criteria'); // Debugging line
    }
  }

  onServiceProviderChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const providerId = +select.value;
    console.log('Selected provider ID from dropdown:', providerId); // Debugging line

    const selectedProvider = this.serviceProviders.find(provider => provider.id === providerId);
    console.log('Service provider changed to:', selectedProvider); // Debugging line

    if (selectedProvider) {
      this.serviceForm.patchValue({
        postalAddress: selectedProvider.postal,
        telephone: selectedProvider.phoneNumber,
        email: selectedProvider.email,
        serviceName: selectedProvider.service.serviceName,
        region: selectedProvider.region.regionName,
        accountNumber: selectedProvider.accountNumber
      });
      console.log('Form after provider change:', this.serviceForm.value); // Debugging line
    }
  }

  onSubmit(): void {
    this.SubmittedSuccessfully = false;
    this.errorMessage = null;

    console.log('Form submitted:', this.serviceForm.value);
    if (this.serviceForm.valid) {
      const submitData = {
        ServiceId: this.serviceForm.get('ServiceId')?.value,
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
          console.log('Data submitted successfully!', response);
          if (response.statusCode === 200 && response.requestId) {
            this.requestId = response.requestId;  // Assuming requestId is returned in the response
            this.SubmittedSuccessfully = true;
            console.log('Generated request ID:', this.requestId);
            alert(`Service request submitted successfully! Your request ID is: ${this.requestId}`);
          } 
          else {
            this.errorMessage = response.message || 'Failed to submit service request.';
          }
        },
        error => {
          this.errorMessage = 'Error submitting data: ' + error.message;
        }
      );
    }
  }






  // // Create a new object with only the required fields
  // const submitData = {
  //   ServiceId: this.serviceProviders?.id ?? '',
  //   RegionId: this.serviceProviders?.accountName ?? '',
  //   ServiceProviderId: this.serviceProviders?.principalAmount ?? '',
  //   ProviderPhoneNumber: this.serviceProviders?.phoneNumber ?? '',
  //   ProviderAccountNumber: this.serviceProviders?.solCode ?? '',
  //   ProviderEmail: this.serviceProviders?.accountBalance ?? '',
  //   ProviderPostal: this.serviceProviders?.acid ?? '',
  //   // SyndicatedFlag: this.loanDetails?.SyndicatedFlag ?? ''
  // };
}
