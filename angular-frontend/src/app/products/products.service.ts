import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, tap} from "rxjs";

import { User, Product } from "./shared/interfaces"

@Injectable({providedIn: 'root'})
export class ProductsService {

  private token = "";

  constructor(private httpClient: HttpClient) { }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken("");
    localStorage.clear();
  }

  //----PRODUCTS-----//
  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:3000/products");
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>("http://localhost:3000/products/" + id);
  }

  //----USERS-----//
  login(user: User): Observable<{token: string}> {
    return this.httpClient.post<{token: string}>('/api/users/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      );
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/users/register', user);
  }

}
