import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { SignupServiceService } from '../../services/signup-service/signup-service.service';
import { catchError, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  firstname: string= "";
  lastname: string= "";
  username: string="";
  email: string="";
  password: string = "";
  
  // public signUpForm !: FormGroup
  // constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){}
  // ngOnInit(): void{
  //   this.signUpForm = this.formBuilder.group({
  //     name: [""],
  //     email: [""],
  //     password: [""]
  //   })
  // }

  // signUp(){
  //   this.http.post<any>("http://localhost:3000/signupUsersList", this.signUpForm.value).subscribe(
  //     res=>{
  //       alert('SIGNIN SUCCESFUL');
  //       this.signUpForm.reset();
  //       this.router.navigate(["login"])
  //     }, err=>{
  //       alert("Something went wrong")
  //     }
  //   )
  // }
  constructor(private signupService: SignupServiceService, private router: Router) { }
  onSubmit(){
 
  //    const userData = {
  //     firstname: this.firstname,
  // lastname: this.lastname,
  // username: this.username,
  // email: this.email,
  // password: this.password
  //    }

 

    // if (this.firstname != null && this.lastname != null && this.email != null && this.username != null && this.password !=null){
    //   alert('Signup Successful');
    // } else {
    //   alert('Please enter the details');
    // }
// console.log(userData);

    this.signupService.signup( this.firstname,
      this.lastname,
       
this.email, this.username,
       this.password).pipe(tap((response)=>{
      console.log("Signup successful");
      console.log(response);
         alert('Signup Successful');
         this.router.navigate(['/login']);

    }), catchError((err)=>{
      console.log(err);
      return err;
    })).subscribe();
    // console.log(this.firstname);
    // console.log(this.lastname);

    // console.log(this.email);
    // console.log(this.username);

    // console.log(this.password);

  }


}
