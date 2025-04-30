import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, from, map, Observable, tap } from 'rxjs';
import { DatabaseService } from '../Database/database.service';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  // private mainUrl =
  //   'https://fabricate.mockaroo.com/api/v1/databases/eboard/api/';
   private mainUrl =
    'https://pwa-alpha-aws.roaddirect.co.nz/api/';
  private token = '76fda9e0-486a-4efc-b4ee-3ea32d774c8c'; // Replace with your actual token

  constructor(private http: HttpClient, private db: DatabaseService) {}
  // Function to get headers with Bearer token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
  }

  // GET request
  getCurrentUser(): Observable<any> {
    return this.http.get(this.mainUrl + 'UserManagement/GetCurrentUser');
  }

  // POST request with Bearer token
  getJobsByDateRange(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'Job/GetJobsByDateRange', postData)
      .pipe(
        tap((response) => {
          // Store API response in IndexedDB
          from(this.db.saveJobData(response)).subscribe();
        }),
        catchError(() => {
          // If offline, return cached data 
          return '';
          // return from(this.db.getAllJobData()).pipe(
          //   map((items) => items.map((item) => item.data))
          // );
        })
      );
  }

  // GET request
  getMyTasks(): Observable<any> {
    return this.http.get(this.mainUrl + 'Tracking/GetMyTasks');
  }

  getDefaultSettings(): Observable<any> {
    return this.http.get(this.mainUrl + 'UserManagement/GetDefaultSettings');
  }

  getCachedData() {
    return from(this.db.getAllJobData());
  }

  // POST request with Bearer token
  getetNotesByDateRange(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'Support/GetNotesByDateRange', postData)
      .pipe(
        tap((response) => {
          // Store API response in IndexedDB
          from(this.db.saveJobData(response)).subscribe();
        }),
        catchError(() => {
          // If offline, return cached data
          return from(this.db.getAllJobData()).pipe(
            map((items) => items.map((item) => item.data))
          );
        })
      );
  }

  getEventsByDateRange(postData: any): Observable<any> {
    return this.http
      .get(this.mainUrl + 'Support/GetEvents', postData)
      .pipe(
        tap((response) => {
          // Store API response in IndexedDB
          from(this.db.saveJobData(response)).subscribe();
        }),
        catchError(() => {
          // If offline, return cached data
          return from(this.db.getAllJobData()).pipe(
            map((items) => items.map((item) => item.data))
          );
        })
      );
  }

  getFormFields(): Observable<any> {
    return this.http.get(this.mainUrl + 'Support/GetFormFields');
  }

  getPhotosByJobDetailsId(paramsObj: any): Observable<any> {
      let params = new HttpParams();
  
      // Append query parameters dynamically
      for (let key in paramsObj) {
        if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
          params = params.set(key, paramsObj[key]);
        }
      }
  
      return this.http.get(this.mainUrl + 'Job/GetPhotosByJobDetailsId', {
        params,
      }).pipe(
     
      );
    }
}
