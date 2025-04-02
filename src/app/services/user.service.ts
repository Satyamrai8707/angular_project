import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private apiUrl = '/api/users?page=1&limit=10'; 

  constructor(private http: HttpClient) {}

  // getUsers(): Observable<any> {
    // return this.http.get(this.apiUrl);
  }

