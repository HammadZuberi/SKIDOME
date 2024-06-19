import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/Models/Pagination';
import { Product } from '../shared/Models/Product';
import { Brand } from '../shared/Models/Brand';
import { Type } from '../shared/Models/Type';
import { productParam } from '../shared/Models/ProductParam';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseurl = environment.apiUrl;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  pagination?: Pagination<Product[]>;
  shopParams = new productParam();
  //keyvalue pair for cache class property
  productCache = new Map<string, Pagination<Product[]>>();
  constructor(private http: HttpClient) {}

  getProducts(useCache = true): Observable<Pagination<Product[]>> {
    if (!useCache) this.productCache = new Map();

    if (this.productCache.size > 0 && useCache) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        //if key matches
        this.pagination = this.productCache.get(
          Object.values(this.shopParams).join('-')
        );

        if (this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();
    if (this.shopParams.TypeId)
      params = params.append('typeId', this.shopParams.TypeId);
    if (this.shopParams.BrandId > 0)
      params = params.append('brandId', this.shopParams.BrandId);
    if (this.shopParams.search)
      params = params.append('search', this.shopParams.search);
    params = params.append('sort', this.shopParams.SortOptions);
    params = params.append('pageSize', this.shopParams.pageSize);
    params = params.append('pageIndex', this.shopParams.pageNumber);

    return this.http
      .get<Pagination<Product[]>>(this.baseurl + 'products', {
        params: params,
      })
      .pipe(
        map((response) => {
          // this.products = response.data;
          this.productCache.set(
            Object.values(this.shopParams).join('-'),
            response
          );
          // this.products = [...this.products, ...response.data];
          this.pagination = response;
          return response;
        })
      );
  }

  setShopParams(params: productParam) {
    this.shopParams = params;
  }

  getShopPrams() {
    return this.shopParams;
  }
  getProductsById(id: number) {
    //get product from local list
    const product = [...this.productCache.values()].reduce(
      (acc, paginatedResult) => {
        //... spread operator
        return { ...acc, ...paginatedResult.data.find((x) => x.id === id) };
      },
      {} as Product
    );

    console.log(product);

    if (Object.keys(product).length !== 0) return of(product);
    //return observable instead of product object
    // if (product) return of(product);
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
