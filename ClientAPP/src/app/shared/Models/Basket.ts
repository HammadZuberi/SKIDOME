import * as cuid from "cuid"

export interface Basket {
  id: string;
  items: BasketItems[];
  clientSecret?: string;
  paymentIntentId: string;
  deliveryMethodId: number;
}
  
  export interface BasketItems {
    id: number
    productName: string
    quantity: number
    price: number
    pictureUrl: string
    brand: string
    type: string
  }

  //create a class to generate id

  export class Basket implements Basket{
    id=cuid();
    items: BasketItems[]=[];

  }
  
  export interface BasketTotal{
    shippingPrice :number,
    subTotal:number,
    total:number
  }