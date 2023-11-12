import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { DeliveryMethod } from '../shared/Models/deliveryMethod';
import { Order, OrdertoCreate } from '../shared/Models/order';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  CreateOrder(order: OrdertoCreate) {
    return this.http.post<Order>(this.baseUrl + 'orders', order);
  }

  getDeliveryMethod() {
    return this.http
      .get<DeliveryMethod[]>(this.baseUrl + 'orders/deliveryMethods')
      .pipe(
        //two orgument to get into price order curr - next
        map((dm) => {
          return dm.sort((a, b) => b.price - a.price);
        })
      );
  }
}
