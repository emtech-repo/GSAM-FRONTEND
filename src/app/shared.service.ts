import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable,tap } from 'rxjs';
import { CommonModule, DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class SharedService {
  //!new server


  readonly APIUrl = 'https://192.168.89.189:7213';
  readonly PhotoUrl = 'https://localhost:5001/Photos/';
  readonly ActivityUrl='https://jsonplaceholder.typicode.com/todos';
  private JsonDataUrl='https://datausa.io/api/data?drilldowns=Nation&measures=Population';
  

 public loader =false

  public isAuthenticated = false;
  public currentUser: any;
  public currentUserID: any;

  constructor(private http: HttpClient  , @Inject(DOCUMENT) private document: Document) {
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

  addUser(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/insert', val);
  }

  updateUser(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/update', val);
  }

  setUserActive(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/Active', val);
  }

  setUserInactive(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/Inactive', val);
  }

  getLogin(val: any) {
    return this.http.post(this.APIUrl + '/api/auth/login', val);
  }

  changePassword(val: any) {
    return this.http.post<any>(this.APIUrl + '/user/changePassword', val);
  }

  getUserRoleList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/users/userRoles');
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
<<<<<<< Updated upstream
=======

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

  Getall() {
    return this.http.get(this.userDataUrl);
  }
  getUserRoleList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.userDataUrl}/role`);
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.userDataUrl}`)
      .pipe(
        map((data: any) => data['role']) // Specify the type of 'data' as 'any'
      );
  }

  // getRoles() {
  //   return this.http.get(`${this.userDataUrl}/role`);
  // }



  updateUser(id: any, inputdata: any) {
    return this.http.put(this.userDataUrl + '/' + id, inputdata);
  }
  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.userDataUrl}`)
      .pipe(
        tap((data: any[]) => console.log('Fetched documents:', data)),
        map((data: any) => data['documents']) // Assuming 'document' is the key containing your documents
      );
  }
>>>>>>> Stashed changes
}
