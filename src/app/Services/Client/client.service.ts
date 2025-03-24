import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DatabaseService } from '../Database/database.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  constructor(private http: HttpClient, private db: DatabaseService) { }

  getAllClients(): Observable<any> {
    return this.http.get('api/ClientManagement/GetAllClients', {
      headers: this.getHeaders(),
    });
  }

  getCachedData() {
    return from(this.db.getAllClientData());
  }

}
