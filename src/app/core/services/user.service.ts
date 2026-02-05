import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { API_URL } from '../tokens/api.token';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  constructor(private http: HttpClient, @Inject(API_URL) private baseUrl: string) {

  }

  limit = 5;


  // crud user 
  /**
   * get all user information
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?_limit=${this.limit}`);
  }

  nextPage(): Observable<User[]> {
    this.limit += 5;
    return this.getUsers();
  }
  /**
   * get user by id 
   * params id 
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }



  /**
   * delete user 
   * params id 
   */
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/users/${id}`);
  }
}
