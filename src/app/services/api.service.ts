import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const api_url = 'https://localhost:44310/AdminAPIs.asmx';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  isAuthenticated = false;

  constructor(private http: HttpClient) {
    this.isAuthenticated = !localStorage.getItem('userDetails');
  }

  getAllUsers(formData: any) {
    return this.http.post(`${api_url}/GetAllUsers`, formData);
  }

  getUserData(formData: any) {
    return this.http.post(`${api_url}/GetUserData`, formData);
  }

  activateAccount(formData: any) {
    return this.http.post(`${api_url}/ActivateAccount`, formData);
  }

  getSubscribedUser(formData: any) {
    return this.http.post(`${api_url}/GetSubscribedUser`, formData);
  }

  updateSubscription(formData: any) {
    return this.http.post(`${api_url}/UpdateSubscription`, formData);
  }

  loginUser(formData: any) {
    return this.http.post(`${api_url}/Login`, formData);
  }

  isAuthenticatedUser(): boolean {
    const userDetails = localStorage.getItem('userDetails');
    return userDetails !== null && userDetails !== undefined;
    // return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem('userDetails');
    this.isAuthenticated = false;
  }

}
