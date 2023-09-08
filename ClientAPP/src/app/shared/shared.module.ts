import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //apply as singleton
    PaginationModule.forRoot()
  ],exports:[PaginationModule]
})
export class SharedModule { }
