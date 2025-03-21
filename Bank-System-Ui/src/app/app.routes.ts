import { Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ActiveAccountsComponent } from './pages/active-accounts/active-accounts.component';
import { BlockedAccountsComponent } from './pages/blocked-accounts/blocked-accounts.component';


export const routes: Routes = [
    {path:'home',component:UserDashboardComponent},
    {path:'profile/:id',component:ProfileComponent},
    {path:'admin',component:AdminDashboardComponent},
    {path:'active-account',component:ActiveAccountsComponent},
    {path:'un-active-account',component:BlockedAccountsComponent},
    {path:'login',component:LogInComponent},
    {path:'sign-up',component:SignUpComponent},
    { path: '**', redirectTo: 'home' }
];
