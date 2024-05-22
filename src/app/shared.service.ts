import { Inject, Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { CommonModule, DOCUMENT } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SharedService {


  readonly PhotoUrl = 'https://localhost:5001/Photos/';
  readonly LoanUrl = 'http://192.168.2.23:9006/accounts/la/all';
  readonly ActivityUrl = 'http://192.168.2.23:5260/api/Case/GetAllCases';
  private JsonDataUrl = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';


  readonly UnAssignedUrl = 'http://192.168.2.23:5260/api/Case/GetUnAssignedCases';
  readonly AssignedUrl = 'http://192.168.2.23:5260/api/Case/GetAssignedCases';



  private readonly userDataUrl = 'assets/data/db.json';
  baseUrl: string = "http://localhost:3000/";
  readonly APIUrl = 'https://192.168.89.189:7213';
  readonly baseURL = 'assets/data/db.json'
  readonly CasesUrl = 'http://192.168.2.23:5260/api/Case/GetAllCases'
  readonly LoanURL = 'http://192.168.2.23:9006/accounts/la/all'
  readonly DetailsURL = 'http://192.168.2.23:9006/accounts?acid='

  readonly CreateCaseUrl='http://192.168.2.23:5260/api/Case/CreateCase';
   readonly LoanAccountCaseUrl='http://192.168.2.23:9006/accounts';
  // readonly CustomersUrl ='http://192.168.2.62:5084/api/Refinance';

 readonly MeetingsUrl = 'http://192.168.2.62:5018/api/Meetings';





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


  getJsonData(): Observable<any> {
    return this.http.get<any>(this.JsonDataUrl);


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


   getUnAssigned(): Observable<any[]> {
    return this.http.get<any[]>(`${this.UnAssignedUrl}`)
      .pipe(
        tap((data: any[]) => console.log('Fetched AssignCase:', data)),
        map((data: any) => data['AssignCase']) 
      );
  }


  getAssigned(): Observable<any[]> {
    return this.http.get<any[]>(`${this.AssignedUrl}`)

      .pipe(
        tap((data: any[]) => console.log('Fetched UnAssigned:', data)),
        map((data: any) => data['UnAssigned']) 
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

  // this.yourService.updateData(updatedData).subscribe(() => {
  //   this.refreshData(); // Method to fetch and update the data in your component
  // });

}