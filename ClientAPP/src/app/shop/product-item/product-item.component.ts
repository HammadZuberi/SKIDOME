import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from 'src/app/shared/Models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input()  product?: Product;
  sanitizer = DomSanitizer;
  constructor(){

  }
  getImageUrl(){

      let   thumbnail = (this.product?.pictureUrl);
         return  thumbnail;
  }
}
