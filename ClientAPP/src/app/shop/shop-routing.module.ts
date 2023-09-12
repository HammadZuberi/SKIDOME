import {  NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import ProductDetailsComponent from './product-details/product-details.component';
import { CommonModule } from '@angular/common';


const routes :Routes =[

  // shop remove shop bcs it exits in the module itself
  {path:'shop/:id' ,component:ProductDetailsComponent},
  {path:'' ,component:ShopComponent}
];

@NgModule({
  declarations:[],
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ShopRoutingModule {

  constructor() { }
}
