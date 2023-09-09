import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/Models/Product';
import { Brand } from '../shared/Models/Brand';
import { Type } from '../shared/Models/Type';
import { productParam } from '../shared/Models/ProductParam';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
products : Product[] =[];
types : Type[] =[];
brands : Brand[] =[];
 
shopParams =new productParam();
 SortOptions=[ {name:"Alphabetical",value:"name"},
 {name:"price: High to Low",value:"priceDesc"},
 {name:"price: Low to High",value:"priceAsc"}];
 totalNumber =0;
 
constructor (private shopService:ShopService){

}
  ngOnInit(): void {
this.getProducts();
console.log(this.shopParams);
this.getBrands();
this.getTypes();

  }



  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      
      next: response =>{ 
      this.products= response.data;
      this.shopParams.pageSize =response.pageSize;
      this.shopParams.pageNumber =response.pageIndex;
      this.totalNumber= response.count;
      console.log(this.shopParams);
      console.log(response);
      },
      error: e=> console.error(e)      
    });
  }
  
  getBrands(){
        this.shopService.getBrands().subscribe({
            next: response =>{ this.brands=[{id:0,name:"-All-"},... response]},
      error: e=> console.error(e)      
    });
  }
  
  getTypes(){    
    this.shopService.getTypes().subscribe({
      next: response =>{ this.types= [{id:0,name:"-All-"},... response]},
      error: e=> console.error(e)     
    });
  }



  onBrandSelected(BrandId:number){
this.shopParams.BrandId=BrandId;
this.getProducts();
  }

  onTypeSelected(TypeId:number){
    this.shopParams.TypeId=TypeId;
    this.getProducts();

  }

  onSortSelected(event:any){
this.shopParams.SortOptions=event.target.value;
this.getProducts();
  }

  onPageChanged(event:any){

    if(this.shopParams.pageNumber != event){
      this.shopParams.pageNumber = event;
      
      this.getProducts();
    }

  }
}
