import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, tap } from 'rxjs';
import { DatabaseService } from '../Database/database.service';

@Injectable({
  providedIn: 'root',
})
export class JobsService {

  constructor(private http: HttpClient, private db: DatabaseService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  // GET request
  getCurrentUser(): Observable<any> {
    return this.http.get('api/UserManagement/GetCurrentUser', {
      headers: this.getHeaders(),
    });
  }

  getJobsByDateRange(postData: any): Observable<any> {
    return this.http.post('api/Job/GetJobsByDateRange', postData, {
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
    return this.http.get('api/Tracking/GetMyTasks', {
      headers: this.getHeaders(),
    });
  }

  getCachedData() {
    return from(this.db.getAllJobData());
  }

  getetNotesByDateRange(postData: any): Observable<any> {
    return this.http.post('api/Support/GetNotesByDateRange', postData, {
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
}
