import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/Models/Product';
import { Brand } from '../shared/Models/Brand';
import { Type } from '../shared/Models/Type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
products : Product[] =[];
types : Type[] =[];
brands : Brand[] =[];
 brandIdSelected=0;
 typeIdSelected=0;
SortOptSelected="";
 SortOptions=[ {name:"Alphabetical",value:"name"},
 {name:"price: High to Low",value:"priceDesc"},
 {name:"price: Low to High",value:"priceAsc"}]
 
constructor (private shopService:ShopService){

}
  ngOnInit(): void {
this.getProducts();
this.getBrands();
this.getTypes();

  }



  getProducts(){
    this.shopService.getProducts(this.brandIdSelected,this.typeIdSelected,this.SortOptSelected).subscribe({
      next: response =>{ this.products= response.data},
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
this.brandIdSelected=BrandId;
this.getProducts();
  }

  onTypeSelected(TypeId:number){
    this.typeIdSelected=TypeId;
    this.getProducts();

  }

  onSortSelected(event:any){
this.SortOptSelected=event.target.value;
this.getProducts();
  }
}
