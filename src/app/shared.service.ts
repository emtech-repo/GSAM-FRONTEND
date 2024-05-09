import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { CommonModule, DOCUMENT } from '@angular/common';
import { throwError } from 'rxjs';




@Injectable({
  providedIn: 'root',
})
export class SharedService {
  
  readonly APIUrl = 'http://localhost:5001/';
  readonly PhotoUrl = 'https://localhost:5001/Photos/';
  readonly LoanUrl = 'http://192.168.2.23:9006/accounts/la/all';
  readonly ActivityUrl = 'http://192.168.2.23:5260/api/Case/GetAllCases';
  readonly UserInfoUrl = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';
  private JsonDataUrl = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';

  private readonly userDataUrl = 'assets/data/db.json';

  baseUrl: string = "http://localhost:3000/";



  public loader = false

  public isAuthenticated = false;
  public currentUser: any;
  public currentUserID: any;

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

  // getUsersList(val: any) {
  //   return this.http.post<any>(this.APIUrl + '/users/get', val);
  // }

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
  //  return this.http.post(this.APIUrl + '/user/login', val);
  //  }

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


  //////////////////////////////////////
  getJsonData(): Observable<any> {
    return this.http.get<any>(this.JsonDataUrl);

  }
  getUserInfo(): Observable<any> {
    return this.http.get<any>(this.UserInfoUrl);


  }

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
