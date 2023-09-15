import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/Models/Product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';
import { Basket } from 'src/app/shared/Models/Basket';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export default class ProductDetailsComponent  implements OnInit{
  product ?: Product;
  quantity=1;
  quantityInBasket=0;
//to lead breadcrumb dynamically 
  constructor(private shopService:ShopService,private activatedRoute: ActivatedRoute,
    private breadcrumb: BreadcrumbService,private basketService:BasketService){
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
      //for unsubscribing in another component make the obs complete.
      this.basketService.basketSource$.pipe(take(1)).subscribe({
        next: bask=> {
          const item = bask?.items.find(x=> x.id === +id);
          if(item){
          this.quantity=item.quantity;
          this.quantityInBasket=item.quantity;}
        }
      })
      },
      error: e=>  console.error(e)
      
    });


  }

  
  loadImage(imgsrc :string ):string{     
    let pro = this.shopService.getImagefromUrl(imgsrc)
    // console.log(pro);
    return pro ;
    
  }

  increaseQuantity(){
this.quantity++;
  }
  decreaseQuantity(){
this.quantity--;
  }

  updateBasket(){
    if(this.product){

      if(this.quantity > this.quantityInBasket){
       const ItemToAdd= this.quantity - this.quantityInBasket;
       this.quantityInBasket += ItemToAdd;
       this.basketService.addItemToBasket(this.product,ItemToAdd);
                      }
                      else{
                        const itemToremove =this.quantityInBasket -this.quantity;
                        this.quantityInBasket -= itemToremove;
                        this.basketService.removeItemFromBasket(this.product.id,itemToremove);
                        
                                      }


    }
  }

  //if you alredy had component in the source you can access by a get and name 
  get buttonText(){

    return (this.quantityInBasket ===0) ? 'Add to Basket': 'Update Basket'; 
  }
}
