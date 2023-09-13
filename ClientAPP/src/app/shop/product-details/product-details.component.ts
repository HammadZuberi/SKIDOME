import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/Models/Product';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export default class ProductDetailsComponent  implements OnInit{
  product ?: Product;
//to lead breadcrumb dynamically 
  constructor(private shopService:ShopService,private activatedRoute: ActivatedRoute,
    private breadcrumb: BreadcrumbService){
      //empty before loading next prod
      this.breadcrumb.set('@productDetails',' ');

  }
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){

    const id= this.activatedRoute.snapshot.paramMap.get('id');
    if(id)
    //casting id string to numb by + sign
    this.shopService.getProductsById(+id).subscribe({
      next: response => {this.product = response; 
      this.breadcrumb.set('@productDetails',this.product.name);
      },
      error: e=>  console.error(e)
      
    });


  }

  
  loadImage(imgsrc :string ):string{     
    let pro = this.shopService.getImagefromUrl(imgsrc)
    // console.log(pro);
    return pro ;
    
  }
}
