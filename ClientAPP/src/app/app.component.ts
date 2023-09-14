import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'SKIDOME';

  constructor(private basketService:BasketService){

  }
  ngOnInit(): void      {
    //for persistent data even if website restart or refresh on start we get same basket from client local storage
    const basketId =localStorage.getItem('Basket_id') ;
    if(basketId)
    this.basketService.getBasket(basketId);
  }


}
