import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OsrService {
private mainUrl = environment.apiBase;

  constructor(private http: HttpClient) { }

  syncSiteInspection(postData: any): Observable<any> {
    return this.http
      .post(this.mainUrl + 'OSR/SyncSiteInspection', postData)
      .pipe(
        tap((response) => {
        }),
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
        tap((response) => {
        }),
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
  
}
