import { Component } from '@angular/core';
import { HeaderComponent } from '../../child-support-dashboard/components/header/header.component';
import { SidebarComponent } from '../../child-support-dashboard/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { RightSidebarComponent } from '../../child-support-dashboard/components/right-sidebar/right-sidebar/right-sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent,RouterOutlet,RightSidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
