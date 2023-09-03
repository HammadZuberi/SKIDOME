import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './Models/Product';
import { Pagination } from './Models/Pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'SKIDOME';
  products: Product[]=[];

  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
     this.http.get<Pagination<Product[]>>('https://localhost:5001/api/products?pageSize=50').subscribe({
// next: (response :any)=>{console.log(response); this.products=response.data} ,
next: response =>{ this.products=response.data } ,
error: err=> console.log(err),
complete:()=>{

  console.log("The process is completed");
  console.log("The process is going to next stage");
}




     });
    
    
  }


}
