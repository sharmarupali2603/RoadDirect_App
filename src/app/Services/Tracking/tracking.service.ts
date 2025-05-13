import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  private mainUrl = environment.apiBase;

  constructor(private http: HttpClient) { }

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

   getTrackingNotesByJobId(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    // Append query parameters dynamically
    for (let key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.http.get(this.mainUrl + 'Tracking/GetTrackingNotesByJobId', {
      params,
    }).pipe(
   
    );
  }

  getTrackingNoteAttachmentById(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    // Append query parameters dynamically
    for (let key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.http.get(this.mainUrl + 'Tracking/GetTrackingNoteAttachmentById', {
      params,
    }).pipe(
   
    );
  }
}
