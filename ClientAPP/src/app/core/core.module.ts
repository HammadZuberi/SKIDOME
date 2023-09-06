import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarAppComponent } from './nav-bar-app/nav-bar-app.component';



@NgModule({
  declarations: [
    NavBarAppComponent],
  imports: [
    CommonModule
  ],
  exports:[
    NavBarAppComponent
  ]
})
export class CoreModule { }
