import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DatabaseService } from '../Database/database.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  constructor(private http: HttpClient, private db: DatabaseService) { }

  getAllVehicle(): Observable<any> {
    return this.http.get('api/Support/GetVehicles', {
      headers: this.getHeaders(),
    });
  }

  getCachedData() {
    return from(this.db.getAllVehicleData());
  }
}