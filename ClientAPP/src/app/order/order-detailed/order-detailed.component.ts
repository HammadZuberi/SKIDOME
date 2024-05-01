import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/Models/order';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss'],
})
export class OrderDetailedComponent implements OnInit {
  order?: Order;

  constructor(
    private orderService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private breadcrumb: BreadcrumbService
  ) {
    this.breadcrumb.set('@OrderDetails', ' ');
  }

  ngOnInit(): void {
    this.getCustomerOrder();
  }

  getCustomerOrder() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.orderService.getOrderbyId(+id).subscribe({
        next: (response) => {
          (this.order = response),
            this.breadcrumb.set(
              '@OrderDetails',
              `Order # ${response.id} - ${response.status}`
            );
        },
        error: (e) => console.log(e),
      });
    }
  }
}
