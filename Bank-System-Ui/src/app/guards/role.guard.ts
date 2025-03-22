import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: any): boolean {
    const userRole = localStorage.getItem('userRole');
    const requiredRole = route.data['role'];

    if (!userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    if (userRole === requiredRole) {
      return true;
    }

    // Redirect to appropriate dashboard based on role
    if (userRole === 'admin') {
      this.router.navigate(['/admin']);
    } else if (userRole === 'user') {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }
} 