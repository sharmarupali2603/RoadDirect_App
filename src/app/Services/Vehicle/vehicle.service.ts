import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatabaseService } from '../Database/database.service';
import { Observable, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  // private mainUrl =
  //   'https://fabricate.mockaroo.com/api/v1/databases/eboard/api/';
  private mainUrl =
  'https://pwa-alpha-aws.roaddirect.co.nz/api/';
    private token = '76fda9e0-486a-4efc-b4ee-3ea32d774c8c'; // Replace with your actual token
  
    // Function to get headers with Bearer token
    private getHeaders(): HttpHeaders {
      return new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      });
    }
  
    constructor(private http: HttpClient,  private db: DatabaseService) {}
  
    getAllVehicle(): Observable<any> {
      return this.http.get(this.mainUrl + 'Support/GetVehicles');
    }
  
    getCachedData() {
      return from(this.db.getAllVehicleData());
    }
  }