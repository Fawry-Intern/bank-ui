import { Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    {path:'home',component:UserDashboardComponent},
    {path:'admin',component:AdminDashboardComponent},
    {path:'login',component:LogInComponent},
    {path:'sign-up',component:SignUpComponent},
    { path: '**', redirectTo: 'admin' }
];
