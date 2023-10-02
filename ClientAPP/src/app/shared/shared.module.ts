import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './pagination-header/pagination-header.component';
import { PagerComponent } from './pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalComponent } from './order-total/order-total.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { InputTextComponent } from './components/input-text/input-text.component';

@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PagerComponent,
    OrderTotalComponent,
    InputTextComponent
  ],
  imports: [
    CommonModule,
    //apply as singleton
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],exports:[
    PaginationModule,
    PaginationHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    InputTextComponent
    
  ]
})
export class SharedModule { }
