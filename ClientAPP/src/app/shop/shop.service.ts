import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/Models/Pagination';
import { Product } from '../shared/Models/Product';
import { Brand } from '../shared/Models/Brand';
import { Type } from '../shared/Models/Type';
import { productParam } from '../shared/Models/ProductParam';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseurl = 'https://localhost:5001/api/';
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  constructor(private http: HttpClient) {}

  getProducts(prodParam: productParam) {
    let params = new HttpParams();
    if (prodParam.TypeId) params = params.append('typeId', prodParam.TypeId);
    if (prodParam.BrandId > 0)
      params = params.append('brandId', prodParam.BrandId);
    if (prodParam.search) params = params.append('search', prodParam.search);
    params = params.append('sort', prodParam.SortOptions);
    params = params.append('pageSize', prodParam.pageSize);
    params = params.append('pageIndex', prodParam.pageNumber);

    return this.http
      .get<Pagination<Product[]>>(this.baseurl + 'products', {
        params: params,
      })
      .pipe(
        map((response) => {
          this.products = response.data;
          return response;
        })
      );
  }

  getProductsById(id: number) {
    //get product from local list
    const product = this.products.find((p) => p.id === id);
    //return observable instead of product object
    if (product) return of(product);
    // let params= new HttpParams();
    // params= params.append("id",id);
    return this.http.get<Product>(this.baseurl + 'Products/' + id);
  }

  getBrands() {
    if (this.brands.length > 0) return of(this.brands);
    return this.http.get<Brand[]>(this.baseurl + 'products/brands').pipe(
      map((response) => {
        this.brands = response;
        return response;
      })
    );
  }
  getTypes() {
    if (this.types.length > 0) return of(this.types);
    return this.http
      .get<Type[]>(this.baseurl + 'products/Types')
      .pipe(map((type) => (this.types = type)));
  }

  getImagefromUrl(src: string): string {
    this.http.get(src, { responseType: 'blob' }).subscribe((response) => {
      // Handle the image response here, e.g., display it in your template
      const reader = new FileReader();
      reader.onload = () => {
        src = reader.result as string;
      };
      reader.readAsDataURL(response);
    });

    return src;
  }
}
