import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarAppComponent } from './nav-bar-app/nav-bar-app.component';
import {  RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    NavBarAppComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      preventDuplicates:true,
      positionClass:'toast-bottom-right'
    })
  ],
  exports:[
    NavBarAppComponent
  ]
})
export class CoreModule { }
