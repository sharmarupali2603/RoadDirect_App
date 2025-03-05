import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, from, map, Observable, tap } from 'rxjs';
import { DatabaseService } from '../Database/database.service';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private mainUrl =
    'https://fabricate.mockaroo.com/api/v1/databases/eboard/api/';
  private token = '76fda9e0-486a-4efc-b4ee-3ea32d774c8c'; // Replace with your actual token

  constructor(private http: HttpClient, private db:DatabaseService) {}
  // Function to get headers with Bearer token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
  }

  // GET request
  getCurrentUser(): Observable<any> {
    return this.http.get(this.mainUrl + 'GetCurrentUser', {
      headers: this.getHeaders(),
    });
  }

  // POST request with Bearer token
  getJobsByDateRange(postData: any): Observable<any> {
    return this.http.post(this.mainUrl + 'GetJobsByDateRange', postData, {
      headers: this.getHeaders(),
    }).pipe(
          tap((response) => {
            // Store API response in IndexedDB
            from(this.db.saveData(response)).subscribe();
          }),
          catchError(() => {
            // If offline, return cached data
            return from(this.db.getAllData()).pipe(map((items) => items.map((item) => item.data)));
          })
        );
  }
  
  getCachedData() {
    return from(this.db.getAllData());
  }

}
