import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Basket, BasketItems, BasketTotal } from '../shared/Models/Basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl =environment.apiUrl;
  //initialize to null creating as observable and as service is a singleton so the informaation stays  alive until application is diposed off

  private basketSource = new BehaviorSubject<Basket| null>(null);
  basketSource$ =this.basketSource.asObservable();

//making total an observable so any component can subscribe to it

private basketTotalSource = new BehaviorSubject<BasketTotal| null>(null);
basketTotalSource$ =this.basketTotalSource.asObservable();



  //update the observable and use in the required component
  constructor(private httpClient :HttpClient) { }



  getBasket(id :string){


    return this.httpClient.get<Basket>(this.baseUrl +'basket?id='+id).subscribe({
      next: basket => {this.basketSource.next(basket);
        this.calculateTotal();
      },
      error:e=> console.log(e)
    });
  }


  setBasket(basket:Basket){
    return this.httpClient.post<Basket>(this.baseUrl +'basket',basket).subscribe({
      next: basket=> {
        this.basketSource.next(basket);
        this.calculateTotal();
      },
      error :e=> console.log(e)
    });
  }

  getCurrentBasketValue(){
    //value of basket
    return this.basketSource.value;
  }

  addItemToBasket(item:Product,quantity=1){

    const itemToAdd = this.MapProductToBasketItem(item);
    //?? is null
    const basket= this.getCurrentBasketValue()?? this.createBasket();
    basket.items= this.addOrUpdateItem(basket.items,itemToAdd,quantity);
    this.setBasket(basket);

  }

  private addOrUpdateItem(items: BasketItems[], itemToAdd: BasketItems, quantity: number): BasketItems[] {
  //  if  basket items matches the item to add product or create  new item count
    const item= items.find(x=> x.id === itemToAdd.id);
    if(item){
     item.quantity+=quantity;
    }
    else{
      itemToAdd.quantity=quantity;
      items.push(itemToAdd);
    }
    return items;
  }

 private createBasket() :Basket{

    const basket = new Basket();
    localStorage.setItem('Basket_id',basket.id);
    return basket;
  }

  private MapProductToBasketItem(item: Product):BasketItems
  {

    return {
    id:item.id,
    productName:item.name,
    pictureUrl:item.pictureUrl,
    price:item.price,
    quantity:0,
    type:item.productType,
    brand:item.productBrand

      }
    }

//whenever you get or set a basket update value
    private calculateTotal(){

      const basket = this.getCurrentBasketValue();
      if(!basket) return null;


      const shippingPrice = 0;
      const subTotal =basket.items.reduce((sum ,item)=> (item.price * item.quantity) * sum,0);
      const total =subTotal + shippingPrice;

      return this.basketTotalSource.next({shippingPrice,subTotal,total});
    }
}
