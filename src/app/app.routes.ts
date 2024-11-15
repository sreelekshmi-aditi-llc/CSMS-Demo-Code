import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import { DashboardComponent } from './child-support-dashboard/dashboard/dashboard.component';
import { AuthGuard } from './services/auth/auth.guard';
import { HomeComponent } from './modules/home/home.component';
import { PaperAppComponent } from './modules/paper-app/paper-app.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { AuthRedirectGuard } from './services/auth/auth.redirect';
import { CustodialPartyAccordionStep2Component } from './modules/paper-app/componet/ncp-info/custodial-party-accordion-step2/custodial-party-accordion-step2.component';

export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: '', 
        component: LayoutComponent,
        children: [
            { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
            {
                path:'paper-app', component:PaperAppComponent, canActivate: [AuthGuard]
            },
            {
                path:'dashboard', component:DashboardComponent, canActivate: [AuthGuard]
            },
            {
                path:'ncp-info', component:CustodialPartyAccordionStep2Component, canActivate: [AuthGuard]
            }

        ]
    },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] },
    { path: '**', redirectTo: '/login' },


];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }