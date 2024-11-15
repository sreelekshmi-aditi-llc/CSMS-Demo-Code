import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  private apiUrl = 'http://localhost:3000/';  // Your Node.js API endpoint  constructor() { }

  constructor(private http: HttpClient) { }

  signup( firstname: string, lastname: string, email: string, username: string,  password: string ): Observable<any> {
    console.log("signup service");
    
    return this.http.post<any>(this.apiUrl + 'signup', { firstname,
      lastname, email,
      username,
      password}) 
  }
}
