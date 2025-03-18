import { Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'login',component:LogInComponent},
    {path:'sign-up',component:SignUpComponent},
    { path: '**', redirectTo: 'home' }
];
