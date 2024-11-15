import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../../services/login-service/login-service.service';
import { catchError, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
email: string= "";
password: string = "";
errorMessage: string = '';
constructor(private loginService: LoginServiceService,private router: Router, private authService: AuthService){}
onSubmit(){
 
  this.loginService.login(this.email, this.password).pipe(tap((response)=>{
    console.log("login successful");
    console.log(response);
    this.authService.saveToken(response.token);
      // alert('login Successful');
      this.router.navigate(['/dashboard']); // Navigate to a secure route after login
  }), catchError((err)=>{
    this.errorMessage = 'Login failed. Please check your credentials.';
    console.log('Login error', err);
    return err;
  })).subscribe();



  // if (this.username === 'admin' && this.password === 'password'){
  //   alert('Login Successful');
  // } else {
  //   alert('Invalid credentials');
  // }


}

}
