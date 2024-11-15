import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService){}
  onClickDashboard(){
    this.router.navigate(['/dashboard']);
    console.log("Dashboard menu button clicked");
    
  }
  onClickLogout(){
    if(this.authService.isAuthenticated()){
      this.authService.removeToken();
      this.router.navigate(['/login']);
    }
  }

}
