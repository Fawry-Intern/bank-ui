import { Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ActiveAccountsComponent } from './pages/active-accounts/active-accounts.component';
import { BlockedAccountsComponent } from './pages/blocked-accounts/blocked-accounts.component';
import { TransferMoneyComponent } from './pages/transfer-money/transfer-money.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: UserDashboardComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'admin', component: AdminDashboardComponent },
    { path: 'active-account', component: ActiveAccountsComponent },
    { path: 'un-active-account', component: BlockedAccountsComponent },
    { path: 'login', component: LogInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'user' }
    },
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'admin' }
    },
    {
        path: 'transfer-money',
        component: TransferMoneyComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'user' }
    },
    {
        path: 'user-dashboard/transactions',
        component: TransactionsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'user' }
    },
    { path: '**', redirectTo: 'login' }
];
