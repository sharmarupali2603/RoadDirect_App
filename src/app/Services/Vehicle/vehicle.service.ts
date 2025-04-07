import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatabaseService } from '../Database/database.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private mainUrl = environment.apiBase;

  private token = '76fda9e0-486a-4efc-b4ee-3ea32d774c8c'; // Replace with your actual token

  // Function to get headers with Bearer token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
  }

  constructor(private http: HttpClient, private db: DatabaseService) { }

  getAllVehicle(): Observable<any> {
    return this.http.get(this.mainUrl + 'Support/GetVehicles');
  }

  getCachedData() {
    return from(this.db.getAllVehicleData());
  }
}