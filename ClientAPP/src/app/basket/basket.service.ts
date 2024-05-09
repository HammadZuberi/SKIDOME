import { Injectable } from '@angular/core';
import { BehaviorSubject ,map} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Basket, BasketItems, BasketTotal } from '../shared/Models/Basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/Models/Product';
import { NotExpr } from '@angular/compiler';
import { DeliveryMethod } from '../shared/Models/deliveryMethod';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  //initialize to null creating as observable and as service is a singleton so the informaation stays  alive until application is diposed off

  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();

  //making total an observable so any component can subscribe to it

  private basketTotalSource = new BehaviorSubject<BasketTotal | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  shipingPrice = 0;

  //update the observable and use in the required component
  constructor(private httpClient: HttpClient) {}

  setShipingPrice(deliveryMethod: DeliveryMethod) {
    const basket = this.getCurrentBasketValue();
    // this.shipingPrice = deliveryMethod.price;

    if(basket){
      basket.shippingPrice = deliveryMethod.price;
      basket.deliveryMethodId =deliveryMethod.id;
      //setting on Redis
      this.setBasket(basket);
    }
    // this.calculateTotal(); in the set basket
  }

  createPaymentIntent(){
    return this.httpClient
      .post<Basket>(
        this.baseUrl + 'payments/' + this.getCurrentBasketValue()?.id,
        {}
      )
      .pipe(
        map((basket) => {
          this.basketSource.next(basket);
          console.log(basket);
        })
      );
  }
  getBasket(id: string) {
    return this.httpClient
      .get<Basket>(this.baseUrl + 'basket?id=' + id)
      .subscribe({
        next: (basket) => {
          this.basketSource.next(basket);
          this.calculateTotal();
        },
        error: (e) => console.log(e),
      });
  }

  setBasket(basket: Basket) {
    return this.httpClient
      .post<Basket>(this.baseUrl + 'basket', basket)
      .subscribe({
        next: (basket) => {
          this.basketSource.next(basket);
          this.calculateTotal();
        },
        error: (e) => console.log(e),
      });
  }

  getCurrentBasketValue() {
    //value of basket
    return this.basketSource.value;
  }

  addItemToBasket(item: Product | BasketItems, quantity = 1) {
    // const itemToAdd = this.MapProductToBasketItem(item);
    if (this.isProduct(item)) item = this.MapProductToBasketItem(item);

    //?? is null
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, quantity);
    this.setBasket(basket);
  }

  removeItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue();
    if (!basket) return null;

    const item = basket.items.find((x) => x.id === id);
    if (item) {
      //remove 1 quantity
      item.quantity -= quantity;
      if (item.quantity === 0) {
        //check the id given is not found in the remaining basket
        basket.items = basket.items.filter((x) => x.id !== id);
      }
      if (basket.items.length > 0) {
        //update if it has something
        this.setBasket(basket);
      } else this.deleteBasket(basket);
    }
    return basket;
  }

  deleteBasket(basket: Basket) {
    return this.httpClient
      .delete(this.baseUrl + 'basket?id=' + basket.id)
      .subscribe({
        //empty basket and it sources
        next: () => {
          this.deleteLocalBasket();
        },
      });
  }

  deleteLocalBasket() {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('Basket_Id');
  }
  private addOrUpdateItem(
    items: BasketItems[],
    itemToAdd: BasketItems,
    quantity: number
  ): BasketItems[] {
    //  if  basket items matches the item to add product or create  new item count
    const item = items.find((x) => x.id === itemToAdd.id);
    if (item) {
      item.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('Basket_id', basket.id);
    return basket;
  }

  private MapProductToBasketItem(item: Product): BasketItems {
    return {
      id: item.id,
      productName: item.name,
      pictureUrl: item.pictureUrl,
      price: item.price,
      quantity: 0,
      type: item.productType,
      brand: item.productBrand,
    };
  }

  //whenever you get or set a basket update value
  private calculateTotal() {
    const basket = this.getCurrentBasketValue();
    if (!basket) return null;

    // const shippingPrice = 0;

    const subTotal = basket.items.reduce(
      (sum, item) => item.price * item.quantity + sum,
      0
    );

    // console.log(shippingPrice,subTotal);
    //refers to the class property
    const total = subTotal + basket.shippingPrice;

    return this.basketTotalSource.next({
      shippingPrice: basket.shippingPrice,
      subTotal,
      total,
    });
  }

  private isProduct(item: Product | BasketItems): item is Product {
    //using Type Guard
    return (item as Product).productBrand !== undefined;
  }
}
