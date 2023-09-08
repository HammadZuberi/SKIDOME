import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/Models/Pagination';
import { Product } from '../shared/Models/Product';
import { Brand } from '../shared/Models/Brand';
import { Type } from '../shared/Models/Type';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
baseurl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { 


  }
  
  getProducts(BrandId?:number,TypeId?:number,SortOptions?:string){

    let params= new HttpParams();
  if (TypeId) params= params.append("typeId",TypeId);
  if (BrandId) params= params.append("brandId",BrandId);
  if (SortOptions) params= params.append("sort",SortOptions);
  params= params.append("pageSize",50)


      return this.http.get<Pagination<Product[]>>(this.baseurl+'products',{params:params});
  }

  getBrands(){
    return this.http.get<Brand[]>(this.baseurl+'products/brands');
  }
  getTypes(){
    return this.http.get<Type[]>(this.baseurl+'products/Types');

}}
