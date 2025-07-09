import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OsrService {
  private mainUrl = environment.apiBase;

  constructor(private http: HttpClient) {}

// site Inspection related 
  syncSiteInspection(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'OSR/SyncSiteInspection', postData)
      .pipe(
        tap((response) => {}),
        catchError(() => {
          // If offline, return cached data
          return '';
        })
      );
  }

  getSiteInspections(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'OSR/GetSiteInspections', postData)
      .pipe(
        tap((response) => {}),
        catchError(() => {
          // If offline, return cached data
          return '';
        })
      );
  }

  getSiteInspectionById(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    // Append query parameters dynamically
    for (let key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.http
      .get(this.mainUrl + 'OSR/GetSiteInspectionById', {
        params,
      })
      .pipe();
  }


// site TSL related 
  syncSiteTSL(postData: any): Observable<any> {
    return this.http.post(this.mainUrl + 'OSR/SyncSiteTSL', postData).pipe(
      tap((response) => {}),
      catchError(() => {
        // If offline, return cached data
        return '';
      })
    );
  }

  getSiteTSLs(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'OSR/GetSiteTSLs', postData)
      .pipe(
        tap((response) => {}),
        catchError(() => {
          // If offline, return cached data
          return '';
        })
      );
  }

  getSiteTSLById(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    // Append query parameters dynamically
    for (let key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.http
      .get(this.mainUrl + 'OSR/GetSiteTSLById', {
        params,
      })
      .pipe();
  }

  
// site Handover related 
  syncSiteHandover(postData: any): Observable<any> {
    return this.http.post(this.mainUrl + 'OSR/SyncSiteHandover', postData).pipe(
      tap((response) => {}),
      catchError(() => {
        // If offline, return cached data
        return '';
      })
    );
  }

  getSiteHandovers(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'OSR/GetSiteHandovers', postData)
      .pipe(
        tap((response) => {}),
        catchError(() => {
          // If offline, return cached data
          return '';
        })
      );
  }

  getSiteHandoverById(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    // Append query parameters dynamically
    for (let key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.http
      .get(this.mainUrl + 'OSR/GetSiteHandoverById', {
        params,
      })
      .pipe();
  }

  // Vehicle Check related 
  syncVehicleCheck(postData: any): Observable<any> {
    return this.http.post(this.mainUrl + 'OSR/SyncVehicleCheck', postData).pipe(
      tap((response) => {}),
      catchError(() => {
        // If offline, return cached data
        return '';
      })
    );
  }

  getVehicleChecks(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'OSR/GetVehicleChecks', postData)
      .pipe(
        tap((response) => {}),
        catchError(() => {
          // If offline, return cached data
          return '';
        })
      );
  }

  getVehicleCheckById(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    // Append query parameters dynamically
    for (let key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.http
      .get(this.mainUrl + 'OSR/GetVehicleCheckById', {
        params,
      })
      .pipe();
  }
}
