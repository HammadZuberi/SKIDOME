import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'SKIDOME';

  constructor(private basketService:BasketService,
     private accountService: AccountService){

  }
  ngOnInit(): void      {
this.loadBasket();
this.loadCurrentUser();
  }

  loadBasket(){
    //for persistent data even if website restart or refresh on start we get same basket from client local storage
    const basketId =localStorage.getItem('Basket_id') ;
    if(basketId)    this.basketService.getBasket(basketId);
  }

  loadCurrentUser(){
    const tokenId =localStorage.getItem('token') ;
    // if(tokenId)    this.accountService.loadCurrentUser(tokenId).subscribe();
    this.accountService.loadCurrentUser(tokenId).subscribe();

  }

}
