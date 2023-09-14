import { Component } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, BasketItems } from 'src/app/shared/Models/Basket';

@Component({
  selector: 'app-nav-bar-app',
  templateUrl: './nav-bar-app.component.html',
  styleUrls: ['./nav-bar-app.component.scss']
})
export class NavBarAppComponent {

  constructor(public basketService:BasketService){
    
  }
  getCount(items :BasketItems[]){
    //iterate and callback each item and perform function starting value 0;
    return items.reduce((sum,item) => ( sum + item.quantity),0 );

  }
}
