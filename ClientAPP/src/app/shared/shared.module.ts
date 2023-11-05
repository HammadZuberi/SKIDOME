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
import { StepperComponent } from './components/stepper/stepper.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PagerComponent,
    OrderTotalComponent,
    InputTextComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    //apply as singleton
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CdkStepperModule
  ],exports:[
    PaginationModule,
    PaginationHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    InputTextComponent,
    StepperComponent,
    CdkStepperModule
    
  ]
})
export class SharedModule { }
