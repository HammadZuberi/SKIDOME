import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketItems } from '../shared/Models/Basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  constructor(public basketService: BasketService) {}

  increamentItem(item: BasketItems) {
    this.basketService.addItemToBasket(item);
  }

  // removeItem(id:number,quantity:number){
  //   this.basketService.removeItemFromBasket(id,quantity);

  // } done for event emmiter use as a single object

  removeItem(event: { id: number; quantity: number }) {
    this.basketService.removeItemFromBasket(event.id, event.quantity);
  }
}
