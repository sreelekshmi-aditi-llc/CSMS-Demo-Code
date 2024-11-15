import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router){}

  onClickPaper(){
    this.router.navigate(['/paper-app']);
    console.log("paper menu button clicked");
    
  }

}
