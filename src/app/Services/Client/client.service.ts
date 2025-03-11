import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatabaseService } from '../Database/database.service';
import { Observable, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private mainUrl =
    'https://fabricate.mockaroo.com/api/v1/databases/eboard/api/';
  private token = '76fda9e0-486a-4efc-b4ee-3ea32d774c8c'; // Replace with your actual token

  // Function to get headers with Bearer token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
  }

  constructor(private http: HttpClient,  private db: DatabaseService) {}

  getAllClients(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    // Append query parameters dynamically
    for (let key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.http.get(this.mainUrl + 'getAllClients', {
      headers: this.getHeaders(),
      params,
    }).pipe(
      tap((response) => {
        // Store API response in IndexedDB
        // from(this.db.saveData(response)).subscribe();
      }),
      catchError(() => {
        // If offline, return cached data
        return from(this.db.getAllClientData()).pipe(map((items) => items.map((item) => item.data)));
      })
    );
  }

  getCachedData() {
    return from(this.db.getAllClientData());
  }

}
