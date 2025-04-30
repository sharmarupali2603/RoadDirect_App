import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatabaseService } from '../Database/database.service';
import { Observable, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  private mainUrl = 'https://pwa-alpha-aws.roaddirect.co.nz/api/';
  private token = '76fda9e0-486a-4efc-b4ee-3ea32d774c8c'; // Replace with your actual token

  constructor(private http: HttpClient) {}
  // Function to get headers with Bearer token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllProducts(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    // Append query parameters dynamically
    for (let key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.http
      .get(this.mainUrl + 'Tracking/GetAllProducts', {
        params,
      })
      .pipe();
  }

  addTrackingRecord(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'Tracking/AddTrackingTask', postData)
      .pipe(
        tap((response) => {
        }),
        catchError(() => {
          // If offline, return cached data
          return '';
        })
      );
  }
  getVehicleRates(): Observable<any> {
    return this.http.get(this.mainUrl + 'Tracking/GetLabourRates');
  }
  getTrackingTaskById(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    // Append query parameters dynamically
    for (let key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.http.get(this.mainUrl + 'Tracking/GetTrackingTaskById', {
      params,
    }).pipe(
   
    );
  }
  updateTrackingRecord(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'Tracking/UpdateTrackingTask', postData)
      .pipe(
        tap((response) => {
        }),
        catchError(() => {
          // If offline, return cached data
          return '';
        })
      );
  }
  updateTaskTime(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'Tracking/UpdateTaskTime', postData)
      .pipe(
        tap((response) => {
        }),
        catchError(() => {
          // If offline, return cached data
          return '';
        })
      );
  }

  addTrackingNotes(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'Tracking/AddTrackingNotes', postData)
      .pipe(
        tap((response) => {
        }),
        catchError(() => {
          // If offline, return cached data
          return '';
        })
      );
  }

  updateEquipment(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'Tracking/UpdateEquipment', postData)
      .pipe(
        tap((response) => {
        }),
        catchError(() => {
          // If offline, return cached data
          return '';
        })
      );
  }

  getLatestJobItemCounts(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    // Append query parameters dynamically
    for (let key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.http.get(this.mainUrl + 'Tracking/GetLatestJobItemCounts', {
      params,
    }).pipe(
   
    );
  }

  addClientSignOff(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'Tracking/AddClientSignOff', postData)
      .pipe(
        tap((response) => {
        }),
        catchError(() => {
          // If offline, return cached data
          return '';
        })
      );
  }

  getClientSignOffsByJobId(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    // Append query parameters dynamically
    for (let key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.http.get(this.mainUrl + 'Tracking/GetClientSignOffsByJobId', {
      params,
    }).pipe(
   
    );
  }
}
