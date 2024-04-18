import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YahooFinanceService {

  constructor(private http: HttpClient) { }

  getAutoCompleteData(symbol: string, region: string): Observable<any> {
    const url = `https://api.example.com/yahoo-finance/autocomplete?symbol=${symbol}&region=${region}`;
    return this.http.get(url);
  }
}
