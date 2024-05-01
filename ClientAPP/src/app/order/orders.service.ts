import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/Models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOrderbyId(id: number) {
   return this.http.get<Order>(this.baseUrl + 'orders/' + id);
  }

  getCustomerOrders() {
   return this.http.get<Order[]>(this.baseUrl + 'orders');
  }
}
