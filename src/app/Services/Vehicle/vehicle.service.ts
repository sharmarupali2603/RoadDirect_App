import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DatabaseService } from '../Database/database.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  // Function to get headers with Bearer token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      //Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
  }

  constructor(private http: HttpClient, private db: DatabaseService) { }

  getAllVehicle(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    // Append query parameters dynamically
    for (let key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.http.get('api/Support/GetVehicles', {
      headers: this.getHeaders(),
      params,
    }).pipe(
      tap((response) => {
        // Store API response in IndexedDB
        from(this.db.saveVehicleData(response)).subscribe();
      }),
      catchError(() => {
        // If offline, return cached data
        return from(this.db.getAllVehicleData()).pipe(map((items) => items.map((item) => item.data)));
      })
    );
  }

  getCachedData() {
    return from(this.db.getAllVehicleData());
  }
}