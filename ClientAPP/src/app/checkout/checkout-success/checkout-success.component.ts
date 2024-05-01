import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Order } from 'src/app/shared/Models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss'],
})
export class CheckoutSuccessComponent {
  order?: Order;
  constructor(private router: Router) {
    let nav = this.router.getCurrentNavigation();
    this.order = nav?.extras?.state as Order;
  }

  // constructor(private router: Router) {
  //   console.log(this.router.getCurrentNavigation().extras.state.example); // should log out 'bar'
  // }
  viewCustomerOrder() {
    let nav = this.router.getCurrentNavigation();
    this.order = nav?.extras?.state as Order;

    // if (this.order) {
    //   const NavigationExtras: NavigationExtras = { state: order };
    //   this.router.navigate(['order/details/' + order]);
    // } else {
    //   console.log('order not found');
    // }
  }
}
