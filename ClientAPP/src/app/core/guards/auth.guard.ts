import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  // b.c root guard subscribe and unsubscribe automatically from observalbel

  return accountService.CurrentUser$.pipe(
    map((auth) => {
      if (auth) return true;
      else {

        //when app startsa
        router.navigate(['/account/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
    })
  );
};
