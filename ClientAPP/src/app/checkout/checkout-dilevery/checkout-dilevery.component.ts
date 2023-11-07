import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeliveryMethod } from 'src/app/shared/Models/deliveryMethod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-dilevery',
  templateUrl: './checkout-dilevery.component.html',
  styleUrls: ['./checkout-dilevery.component.scss'],
})
export class CheckoutDileveryComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;

  deliveryMethods: DeliveryMethod[] = [];

  constructor(private checkoutservice: CheckoutService) {}

  ngOnInit(): void {
    this.checkoutservice.getDeliveryMethod().subscribe({
      next: (dm) => (this.deliveryMethods = dm)
    });
  }
}
