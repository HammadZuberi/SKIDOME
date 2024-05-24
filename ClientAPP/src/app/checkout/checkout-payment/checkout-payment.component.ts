import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/shared/Models/Basket';
import { Address } from 'src/app/shared/Models/User';
import { NavigationExtras, Router } from '@angular/router';
import {
  Stripe,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
  loadStripe,
} from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;
  stripe: Stripe | null = null;
  //class property
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  cardNumber?: StripeCardNumberElement;
  cardErrors: any;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  //laod stripe
  ngOnInit(): void {
//publish key
    loadStripe('pk_test_51OcIyAChqXGeDg7By9DTylUDHQ6SPzHpooYhKvla015yKHqzfwSPxzE7g0vln19pmWDZLHFiQL87W4sRxx1qdWk300N6ngbhte').then(stripe=> {
      this.stripe =stripe;
      const elements = stripe?. elements();
      if(elements){
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement);
        this.cardNumber.on('change',event=>{
          if(event.error) this.cardErrors = event.error.message;
          else this.cardErrors= null;
        });

        
        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement); 
        this.cardExpiry.on('change',event=>{
          if(event.error) this.cardErrors = event.error.message;
          else this.cardErrors= null;
        });
        
        this.cardCvc = elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement); 
        this.cardCvc.on('change',event=>{
          if(event.error) this.cardErrors = event.error.message;
          else this.cardErrors= null;
        });
      }
    });
  }

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
        const NavigationExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success'], NavigationExtras);
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
