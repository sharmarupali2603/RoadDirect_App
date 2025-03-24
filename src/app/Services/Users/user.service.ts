import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from '../Database/database.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  constructor(private http: HttpClient, private db: DatabaseService) { }

  getAllUsers(): Observable<any> {
    return this.http.get('api/UserManagement/GetAllUsers', {
      headers: this.getHeaders(),
    });
  }
}
