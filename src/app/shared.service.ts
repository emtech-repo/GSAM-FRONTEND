import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CommonModule, DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class SharedService {
  //!new server


  readonly APIUrl = 'https://locahost:5001';
  readonly PhotoUrl = 'https://localhost:5001/Photos/';
  readonly ActivityUrl='https://jsonplaceholder.typicode.com/todos';

  readonly UserInfoUrl ='https://datausa.io/api/data?drilldowns=Nation&measures=Population';


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

  getGeo(): Observable<any[]> {
    return this.http.get<any>(this.SearchCaseFormUrl);
  }

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
    return this.http.post(this.APIUrl + '/user/login', val);
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

     
  getUserInfo(): Observable<any> {

    return this.http.get<any>(this.UserInfoUrl);


  }
  
  

}
