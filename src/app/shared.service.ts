import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { CommonModule, DOCUMENT } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SharedService {
  submitServiceData(value: any) {
    throw new Error('Method not implemented.');
  }
  updateRowData(row: any) {
    throw new Error('Method not implemented.');
  }


  readonly PhotoUrl = 'https://localhost:5001/Photos/';
  readonly ServiceUrl = 'http://192.168.88.244:5260/api/ServiceRequest/BookService';
  readonly LoanUrl = 'http://192.168.2.23:9006/accounts/la/all';
  readonly ActivityUrl = 'http://192.168.2.6:5000/api/Case/GetAllCases';



  readonly UnAssignedUrl = 'http://192.168.2.6:5000/api/Case/GetUnAssignedCases';
  readonly Cases = 'http://192.168.2.6:5000/api/Case/GetUnAssignedCases?loanAccount=';
  readonly AssignedUrl = 'http://192.168.2.6:5000/api/Case/GetAssignedCases';
   readonly AssignCaseUrl = 'http://192.168.2.6:5000/api/Case/AssignCase';
  readonly ActiveUrl ='http://192.168.2.6:5000/api/Case/ActiveCases';
  readonly ClosedUrl = 'http://192.168.2.6:5000/api/Case/ClosedCases';




  private readonly userDataUrl = 'assets/data/db.json';
  baseUrl: string = "http://localhost:3000/";
  readonly APIUrl = 'https://192.168.2.6:5000';
  readonly baseURL = 'assets/data/db.json'

  readonly CasesUrl = 'http://192.168.2.6:5000/api/Case/GetAllCases'
  readonly LoanURL = 'http://192.168.2.23:9006/accounts/la/all'
  readonly DetailsURL = 'http://192.168.2.23:9006/accounts?acid='

  readonly CreateCaseUrl='http://192.168.2.6:5000/api/Case/CreateCase';
  readonly LoanAccountCaseUrl ='http://192.168.2.23:9006/accounts';

  // readonly CustomersUrl ='http://192.168.2.62:5084/api/Refinance';

 readonly MeetingsUrl = 'http://192.168.2.6:5000/api/Meetings';
  private storageKey = 'uploads';
  private dataUrl = '/assets/data/data.json';
  private documentsUrl = 'http://localhost:3000/uploads';
  // private documentsUrl = '/assets/data/data.json';





  public loader = false

  public isAuthenticated = false;
  public currentUser: any;
  public currentUserID: any;
  UnAssigned: any;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    // this.currentUser = localStorage.getItem('currentUser');

    // this.currentUser = 21
    const localStorage = document.defaultView?.localStorage;

    if (localStorage && localStorage.getItem('currentUser')) {
      this.currentUser = localStorage.getItem('currentUser');
    }


    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.currentUserID = this.currentUser.UserID;
      this.isAuthenticated = true;
    }

  }

  private tokenResponse: any;


  getUsersList(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/get', val);
  }
  

  uploadDocument(formData: FormData) {
    return this.http.post(this.documentsUrl, formData);
  }
  
 

  getCases(): Observable<any> {
    return this.http.get<any>(this.CasesUrl);

  }
  // createCase(loanDetails: any): Observable<any> {
    
  //   return this.http.post<any>(this.CreateCaseUrl, loanDetails);
  // }



  createCase(loanDetails: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };

    // Convert loanDetails object to JSON string
    const loanDetailsJson = JSON.stringify(loanDetails);

    // Make HTTP POST request with JSON string as the request body
    return this.http.post<any>(this.CreateCaseUrl, loanDetailsJson, options);
  }






  
  // addUser(val: any) {
  //   return this.http.post<any>(this.APIUrl + '/users/insert', val);
  // }

  // updateUser(val: any) {
  //   return this.http.post<any>(this.APIUrl + '/users/update', val);
  // }

  // setUserActive(val: any) {
  //   return this.http.post<any>(this.APIUrl + '/users/Active', val);
  // }

  // setUserInactive(val: any) {
  //   return this.http.post<any>(this.APIUrl + '/users/Inactive', val);
  // }


  // getLogin(val: any) {
  //   return this.http.post(this.APIUrl + '/api/auth/login', val);
  // }

  // changePassword(val: any) {
  //   return this.http.post<any>(this.APIUrl + '/user/changePassword', val);
  // }

  // getUserRoleList(): Observable<any[]> {
  //   return this.http.get<any>(this.APIUrl + '/users/userRoles');
  // }


  getRecentStatus(searchQuery?: string): Observable<any[]> {
    let apiUrl = (this.LoanUrl);

    // Append search query to the API URL if provided
    if (searchQuery && searchQuery.trim() !== '') {
      apiUrl += `?search=${encodeURIComponent(searchQuery)}`;
    }


    return this.http.get<any[]>(apiUrl);
  }




  getRecentActivity(searchQuery?: string): Observable<any[]> {
    let apiUrl = (this.ActivityUrl);

    // Append search query to the API URL if provided
    if (searchQuery && searchQuery.trim() !== '') {
      apiUrl += `?search=${encodeURIComponent(searchQuery)}`;
    }



    

    return this.http.get<any[]>(apiUrl);
  }


 
  getLoan(): Observable<any[]> {
    return this.http.get<any[]>(`${this.LoanURL}`).pipe(
      tap(data => console.log('Loan data:', data))
    );
  }

  
  
  getLoanDetails(accountId: string): Observable<any> {
    const url = `${this.DetailsURL}${accountId}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}`)
      .pipe(
        tap((data: any[]) => console.log('Fetched documents:', data)),
        map((data: any) => data['documents']) // Assuming 'document' is the key containing your documents
      );
  }
  getCreateCase(): Observable<any[]> {
    return this.http.get<any[]>(`${this.CreateCaseUrl}`)
      .pipe(
        tap((data: any[]) => console.log('Fetched CreateCase:', data)),
        map((data: any) => data['CreateCase'])
      );
  }


   getUnAssigned(loanAccount: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.UnAssignedUrl}`)
      .pipe(
        tap((loanAccount: any[]) => console.log('Fetched AssignCase:', loanAccount )),
        map((loanAccount: any) => loanAccount['AssignCase']) 

      );
  }
  
  // getCaseDetails(loanAccount: string): Observable<any> {
  //   const caseDetailsUrl = `${this.UnAssignedUrl}/${loanAccount}`;
  //   return this.http.get<any>(caseDetailsUrl);
  // }
  getCaseDetails(loanAccount: string): Observable<any> {
    const caseDetailsUrl = `${this.Cases}/${loanAccount}`;
    console.log('Fetching case details from URL:', caseDetailsUrl); // Log the URL being fetched
    return this.http.get<any>(caseDetailsUrl);
  }
 

  // assignCase(caseNumber: string, email: string): Observable<any> {
  //   const dataToSend = {
  //     caseNumber: caseNumber,
  //     UserName: email,
      
  //   };
  //   return this.http.post<any>('AssignCaseUrl', dataToSend);
  // }



  assignCase(caseNumber: string, UserName: string): Observable<any> {
    // Set the content type header
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Create an object with caseNumber and email properties
    const dataToSend = { caseNumber: caseNumber, UserName: UserName };

    // Make the HTTP POST request with the object as the request body
    return this.http.post<any>(`${this.AssignCaseUrl}?UserName=${UserName}`, dataToSend, { headers: headers })
      
  }


  // getUnAssigned(loanAccount: string): Observable<any> {
  //   const url = `${this.UnAssignedUrl}${loanAccount}`;
  //   return this.http.get<any>(url).pipe(
  //     catchError(this.handleError)
  //   );
  // }
 

  getAssigned(): Observable<any[]> {
    return this.http.get<any[]>(`${this.AssignedUrl}`)

      .pipe(
        tap((data: any[]) => console.log('Fetched UnAssigned:', data)),
        map((data: any) => data['UnAssigned']) 
      );
  }
  getActive(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ActiveUrl}`)

      .pipe(
        tap((data: any[]) => console.log('Fetched Active:', data)),
        map((data: any) => data['Active'])
      );
  }
  getClosed(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ClosedUrl}`)

      .pipe(
        tap((data: any[]) => console.log('Fetched Closed:', data)),
        map((data: any) => data['Closed'])
      );
  }
  




  
  // getCases(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.CasesUrl}`)
  //     .pipe(
  //       tap((data: any[]) => console.log('Fetched Cases:', data)),
  //       map((data: any) => data['Cases']) 
  //     );
  // }


  getAccounts():Observable<any>{

    let apiUrl = `${this.LoanAccountCaseUrl}/la/all`;
    return this.http.get<any>(apiUrl).pipe(map(
      res => {
        return res || {}
      }
    ))

  }
 


  getMeetings(): Observable<any[]> {
    return this.http.get<any[]>(this.MeetingsUrl);
  }



  //////////////////////////////////////
  // getJsonData(): Observable<any> {
  //   return this.http.get<any>(this.JsonDataUrl);

  // }
 
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.userDataUrl);
  }
  // getLogin(val: any) {
  //  return this.http.post(this.userDataUrl + '/user/login', val);
  // }

  getLogin(credentials: { email: string, password: string }) {
    return this.http.post<any>(`${this.userDataUrl}/users/login`, credentials);
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(this.userDataUrl);
  }


  getUserByCode(code: any): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/users/${code}`);
  }

  isAdmin(): boolean {
    // Example logic to check if user is an admin
    // You can modify this based on how you store user roles in your system
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      // Assuming user role is stored in 'role' property
      return parsedUser.role === 'admin';
    }
    return false;
  }
  isManager(): boolean {
    // Example logic to check if user is an admin
    // You can modify this based on how you store user roles in your system
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      // Assuming user role is stored in 'role' property
      return parsedUser.role === 'manager';
    }
    return false;
  }
  isOfficer(): boolean {
    // Example logic to check if user is an admin
    // You can modify this based on how you store user roles in your system
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      // Assuming user role is stored in 'role' property
      return parsedUser.role === 'officer';
    }
    return false;
  }





  /////////////////////////////////
  registerUser(inputdata: any) {
    return this.http.post(this.baseUrl + 'user', inputdata)
  }

  addEmployee(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'user', data);
  }


  updateEmployee(id: number, updatedFields: any): Observable<any> {
    // Include all fields in the update request
    const allFields = { ...updatedFields }; // Copy the updatedFields object
    allFields.id = id; // Add the employee ID
    return this.http.put(this.baseUrl + `user/${id}`, allFields);
  }

  // updateEmployee(id: number, updatedFields: any): Observable<any> {
  //   return this.http.put(this.baseUrl + `user/${id}`, updatedFields);

  // }
  // updateEmployee(id: number, data: any): Observable<any> {
  //   return this.http.put(this.baseUrl + `user/${id}`, data);

  // }

  getEmployeeList(): Observable<any> {
    return this.http.get(this.baseUrl + 'user');
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + `user/${id}`);

  }

  getServiceData(): Observable<any> {
    return this.http.get<any>(`${this.ServiceUrl}/serviceData`);
  }

  submitServiceDatas(data: any): Observable<any> {
    return this.http.post(`${this.ServiceUrl}/serviceData`, data);
  }

  // this.yourService.updateData(updatedData).subscribe(() => {
  //   this.refreshData(); // Method to fetch and update the data in your component
  // });

}