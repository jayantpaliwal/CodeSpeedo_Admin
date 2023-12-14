import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router } from '@angular/router';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})

// CanDeactivate<DashboardComponent>,
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad  {
  constructor(private router: Router, private api: ApiService) {}

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }

  // canDeactivate(component: DashboardComponent): boolean {
  //   if (component.hasUnsavedChanges()) {
  //     return window.confirm('You have unsaved changes. Do you really want to leave?');
  //   }
  //   return true;
  // }

  canLoad(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    const isAuthenticated = this.api.isAuthenticatedUser();
    console.log(isAuthenticated);
    
    if (isAuthenticated) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }

}