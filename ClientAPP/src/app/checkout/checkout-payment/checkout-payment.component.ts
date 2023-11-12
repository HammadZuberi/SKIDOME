import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/shared/Models/Basket';
import { Address } from 'src/app/shared/Models/User';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router:Router
  ) {}

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) return;

    const OrdertoCreate = this.getOrderToCreate(basket);

    if (!OrdertoCreate) return;

    this.checkoutService.CreateOrder(OrdertoCreate).subscribe({
      next: (order) => {
        this.toastr.success('ORder created successfully');

        this.basketService.deleteLocalBasket();
        //delete form local storage application storage,

        
        console.log(order);
        const NavigationExtras:NavigationExtras={state:order};
        this.router.navigate(['checkout/success'],NavigationExtras);
      },
    });
  }


  private getOrderToCreate(basket: Basket) {
    const DeliveryMethodId = this.checkoutForm
      ?.get('deliveryForm')
      ?.get('deliveryMethod')?.value;

    const ShipToAddress = this.checkoutForm?.get('addressForm')
      ?.value as Address;

    if (!DeliveryMethodId || !ShipToAddress) return;

    return {
      basketId: basket.id,
      DeliveryMethodId: DeliveryMethodId,
      ShipToAddress: ShipToAddress,
    };
  }
}
