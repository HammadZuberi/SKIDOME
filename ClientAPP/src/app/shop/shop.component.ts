import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/Models/Product';
import { Brand } from '../shared/Models/Brand';
import { Type } from '../shared/Models/Type';
import { productParam } from '../shared/Models/ProductParam';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  types: Type[] = [];
  brands: Brand[] = [];

  shopParams: productParam;
  // shopParams =new productParam();

  SortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'price: High to Low', value: 'priceDesc' },
    { name: 'price: Low to High', value: 'priceAsc' },
  ];
  totalNumber = 0;
  @ViewChild('search') search?: ElementRef;

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopPrams();
  }

  ngOnInit(): void {
    this.getProducts();
    // console.log(this.shopParams);
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        // this.shopParams.pageSize = response.pageSize;
        // this.shopParams.pageNumber = response.pageIndex;
        this.totalNumber = response.count;
        // console.log(this.shopParams);
        // console.log(response);
      },
      error: (e) => console.error(e),
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => {
        this.brands = [{ id: 0, name: '-All-' }, ...response];
      },
      error: (e) => console.error(e),
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => {
        this.types = [{ id: 0, name: '-All-' }, ...response];
      },
      error: (e) => console.error(e),
    });
  }

  onBrandSelected(BrandId: number) {
    const params = this.shopService.getShopPrams();
    params.BrandId = BrandId;
    params.pageNumber = 1;

    this.shopService.setShopParams(params);
    this.shopParams = params;

    this.getProducts();
  }

  onTypeSelected(TypeId: number) {
    const params = this.shopService.getShopPrams();
    params.TypeId = TypeId;
    params.pageNumber = 1;

    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onSortSelected(event: any) {
    const params = this.shopService.getShopPrams();
    params.SortOptions = event.target.value;
    params.pageNumber = 1;

    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopPrams();
    if (params.pageNumber != event) {
      params.pageNumber = event;

      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts();
    }
  }

  onSearch() {
    const params = this.shopService.getShopPrams();
    params.search = this.search?.nativeElement.value;
    params.pageNumber = 1;

    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onReset() {
    if (this.search) this.search.nativeElement.value = '';
    this.shopParams = new productParam();

    this.shopService.setShopParams(this.shopParams);

    this.getProducts();
  }
}
