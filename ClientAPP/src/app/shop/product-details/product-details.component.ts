import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/Models/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export default class ProductDetailsComponent  implements OnInit{
  product ?: Product;

  constructor(private shopService:ShopService,private activatedRoute: ActivatedRoute){

  }
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){

    const id= this.activatedRoute.snapshot.paramMap.get('id');
    if(id)
    //casting id string to numb by + sign
    this.shopService.getProductsById(+id).subscribe({
      next: response => {this.product = response},
      error: e=>  console.error(e)
      
    });

  }

}
