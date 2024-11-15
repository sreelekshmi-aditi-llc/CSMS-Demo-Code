import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = 'http://localhost:3000/';  // Your Node.js API endpoint  constructor() { }

  constructor(private http: HttpClient) { }

  login( email: string, password: string ): Observable<any> {
    console.log("signup service");
    
    return this.http.post<any>(this.apiUrl + 'login', {email, password}) 
  }
}
