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
  //!new server


  readonly APIUrl = 'https://192.168.89.189:7213';
  readonly PhotoUrl = 'https://localhost:5001/Photos/';
  readonly ActivityUrl = 'https://jsonplaceholder.typicode.com/todos';
  private JsonDataUrl = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';
  readonly baseURL = 'assets/data/db.json'
  readonly CasesUrl = 'http://192.168.2.23:5260/api/Case/GetAllCases'
  readonly LoanURL = 'http://192.168.2.23:9006/accounts/la/all'
  readonly DetailsURL = 'http://192.168.2.23:9006/accounts?acid='


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

  getUsersList(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/get', val);
  }
  getCases(): Observable<any> {
    return this.http.get<any>(this.CasesUrl);
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
}
