import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/Models/Pagination';
import { Product } from '../shared/Models/Product';
import { Brand } from '../shared/Models/Brand';
import { Type } from '../shared/Models/Type';
import { productParam } from '../shared/Models/ProductParam';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
baseurl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { 


  }
  
  getProducts(prodParam:productParam){

    let params= new HttpParams();
  if (prodParam.TypeId) params= params.append("typeId",prodParam.TypeId);
  if (prodParam.BrandId>0) params= params.append("brandId",prodParam.BrandId);
  if (prodParam.search) params= params.append("search",prodParam.search);
   params= params.append("sort",prodParam.SortOptions);
  params= params.append("pageSize",prodParam.pageSize);
  params= params.append("pageIndex",prodParam.pageNumber);


      return this.http.get<Pagination<Product[]>>(this.baseurl+'products',{params:params});
  }

  getProductsById(id:number){

    // let params= new HttpParams();
    // params= params.append("id",id);
    
    return this.http.get<Product>(this.baseurl+'Products/'+id);
  }

  getBrands(){
    return this.http.get<Brand[]>(this.baseurl+'products/brands');
  }
  getTypes(){
    return this.http.get<Type[]>(this.baseurl+'products/Types');

}}
