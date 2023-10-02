import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  complexPassword: string | RegExp ="(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$";
errors :string[] |null=null;  
  constructor(private fb: FormBuilder,
    private accountService :AccountService, private router:Router ){

  }

  registerForm= this.fb.group({

    displayName: ['',Validators.required],
    email:['',Validators.required,Validators.email],
    password:['',Validators.required,Validators.pattern(this.complexPassword)]
  })

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe({
      next:() => this.router.navigateByUrl('/shop'),
      error: error=> this.errors=error.errors
    })
  }
}
