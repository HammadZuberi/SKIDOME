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
import { firstValueFrom } from 'rxjs';
import { OrdertoCreate } from 'src/app/shared/Models/order';

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
  loading = false;
  cardExpiryComplte = false;
  cardNumberComplte = false;
  cardCvcComplte = false;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  //laod stripe
  ngOnInit(): void {
    //publish key
    loadStripe(
      'pk_test_51OcIyAChqXGeDg7By9DTylUDHQ6SPzHpooYhKvla015yKHqzfwSPxzE7g0vln19pmWDZLHFiQL87W4sRxx1qdWk300N6ngbhte'
    ).then((stripe) => {
      this.stripe = stripe;
      const elements = stripe?.elements();
      if (elements) {
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement);
        this.cardNumber.on('change', (event) => {
          this.cardNumberComplte = event.complete;
          if (event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        });

        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
        this.cardExpiry.on('change', (event) => {
          this.cardExpiryComplte = event.complete;
          if (event.error) {this.cardErrors = event.error.message; console.log(event.error.message);}
          else this.cardErrors = null;
        });

        this.cardCvc = elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement);
        this.cardCvc.on('change', (event) => {
          this.cardCvcComplte = event.complete;
          if (event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        });
      }
    });
  }

  get PaymentFormComplete() {
    return (
      this.checkoutForm?.get('paymentForm')?.valid &&
      this.cardCvcComplte &&
      this.cardExpiryComplte &&
      this.cardNumberComplte
    );
  }
  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();

    try {
      const createOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentStripe(basket);

      if (paymentResult.paymentIntent) {
        this.basketService.deleteLocalBasket();
        //delete form local storage application storage,
        console.log(createOrder);
        const NavigationExtras: NavigationExtras = { state: createOrder };
        this.router.navigate(['checkout/success'], NavigationExtras);
      } else {
        this.toastr.error(paymentResult.error.message);
      }
    } catch (error: any) {
      console.log(error);
      this.toastr.error(error.message);
    } finally {
      this.loading = false;
    }
  }

  private async confirmPaymentStripe(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');

    const resultStripe = this.stripe?.confirmCardPayment(basket.clientSecret!, {
      payment_method: {
        card: this.cardNumber!,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value,
        },
      },
    });

    if (!resultStripe)
      throw new Error('problem attempting Payment with Stripe');

    this.toastr.success('Order created successfully');
    return resultStripe;
  }

  //garantee to return promise
  private async createOrder(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');
    const ordertoCreate = this.getOrderToCreate(basket);

    return firstValueFrom(this.checkoutService.CreateOrder(ordertoCreate));
  }

  private getOrderToCreate(basket: Basket): OrdertoCreate {
    const DeliveryMethodId = this.checkoutForm
      ?.get('deliveryForm')
      ?.get('deliveryMethod')?.value;

    const ShipToAddress = this.checkoutForm?.get('addressForm')
      ?.value as Address;

    if (!DeliveryMethodId || !ShipToAddress)
      throw new Error('Problem with Basket');

    return {
      basketId: basket.id,
      DeliveryMethodId: DeliveryMethodId,
      ShipToAddress: ShipToAddress,
    };
  }
}

// if (!basket) return;
// const OrdertoCreate = this.getOrderToCreate(basket);
// if (!OrdertoCreate) return;

// create a promise instead of subcribing and creating /holding an observable.

// this.checkoutService.CreateOrder(OrdertoCreate).subscribe({
//   next: (order) => {
//     this.toastr.success('ORder created successfully');
//     this.stripe
//       ?.confirmCardPayment(basket.clientSecret!, {
//         payment_method: {
//           card: this.cardNumber!,
//           billing_details: {
//             name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')
//               ?.value,
//           },
//         },
//       })
//       .then((result) => {
//         console.log(result);
//         if (result.paymentIntent) {
//           this.basketService.deleteLocalBasket();
//           //delete form local storage application storage,
//           console.log(order);
//           const NavigationExtras: NavigationExtras = { state: order };
//           this.router.navigate(['checkout/success'], NavigationExtras);
//         } else {
//           this.toastr.error(result.error.message);
//         }
//       });
//   },
// });
