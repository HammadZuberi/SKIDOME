import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(
    private accountService: AccountService,
    public toastr: ToastrService
  ) {}

  saveUserAddress() {
    let Adform = this.checkoutForm?.get('addressForm');

    this.accountService.updateUserAddress(Adform?.value).subscribe({
      next: () => {
        this.toastr.success('Address Saved'),
          // this.checkoutForm?.get('addressForm')?.reset() reset to default
          Adform?.reset(Adform?.value);
      },
    });
  }
}
