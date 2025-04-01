import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatabaseService } from '../Database/database.service';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private mainUrl = environment.apiBase;

  constructor(private http: HttpClient, private db: DatabaseService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  // GET request
  getCurrentUser(): Observable<any> {
    return this.http.get(this.mainUrl + 'UserManagement/GetCurrentUser', {
      headers: this.getHeaders(),
    });
  }

  getJobsByDateRange(postData: any): Observable<any> {
    return this.http.post(this.mainUrl + 'Job/GetJobsByDateRange', postData, {
      headers: this.getHeaders(),
    }).pipe(
      tap((response) => {
        // Store API response in IndexedDB
        from(this.db.saveJobData(response)).subscribe();
      }),
      catchError(() => {
        // If offline, return cached data
        return from(this.db.getAllJobData()).pipe(map((items) => items.map((item) => item.data)));
      })
    );
  }

  // GET request
  getMyTasks(): Observable<any> {
    return this.http.get(this.mainUrl + 'Tracking/GetMyTasks', {
      headers: this.getHeaders(),
    });
  }

  getDefaultSettings(): Observable<any> {
    return this.http.get(this.mainUrl + 'UserManagement/GetDefaultSettings', {
      headers: this.getHeaders(),
    });
  }

  getCachedData() {
    return from(this.db.getAllJobData());
  }

  getetNotesByDateRange(postData: any): Observable<any> {
    return this.http.post(this.mainUrl + 'Support/GetNotesByDateRange', postData, {
      headers: this.getHeaders(),
    }).pipe(
      tap((response) => {
        // Store API response in IndexedDB
        from(this.db.saveJobData(response)).subscribe();
      }),
      catchError(() => {
        // If offline, return cached data
        return from(this.db.getAllJobData()).pipe(map((items) => items.map((item) => item.data)));
      })
    );
  }

  getEventsByDateRange(postData: any): Observable<any> {
    return this.http.get(this.mainUrl + 'Support/GetEvents', {
      headers: this.getHeaders(),
    }).pipe(
      tap((response) => {
        // Store API response in IndexedDB
        from(this.db.saveJobData(response)).subscribe();
      }),
      catchError(() => {
        // If offline, return cached data
        return from(this.db.getAllJobData()).pipe(map((items) => items.map((item) => item.data)));
      })
    );
  }

  getFormFields(): Observable<any> {
    return this.http.get(this.mainUrl + 'Support/GetFormFields', {
      headers: this.getHeaders(),
    });
  }
}
