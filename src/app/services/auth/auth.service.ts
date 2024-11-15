import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apUrl = '';
  constructor(private http: HttpClient) { }

  // Add a method to store the token
  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }
// Add a method to retrieve the token
getToken(): string | null {
  return localStorage.getItem('jwtToken');
}
   // Add a method to check if the user is authenticated
   isAuthenticated(): boolean {
    return !!this.getToken();
  }

  removeToken(){
    return localStorage.clear();
  }
}
