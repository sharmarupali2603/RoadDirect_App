
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatabaseService } from '../Database/database.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mainUrl = environment.apiBase;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  constructor(private http: HttpClient, private db: DatabaseService) { }

  getAllUsers(): Observable<any> {
      return this.http.get(this.mainUrl + 'UserManagement/GetAllUsers');
  }
  getUserByID(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    // Append query parameters dynamically
    for (let key in paramsObj) {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined) {
        params = params.set(key, paramsObj[key]);
      }
    }

      return this.http.get(this.mainUrl + 'UserManagement/GetUserById', {
      params,
    }).pipe(
    );
  }
}
