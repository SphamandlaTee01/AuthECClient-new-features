import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

 
  constructor(public formBuilder : FormBuilder,
    private service : AuthService,
    private router : Router,
    private toastr : ToastrService
  ){}

   isSubmitted:boolean = false;

  form = this.formBuilder.group({

    email : ['',Validators.required],
    password : ['',Validators.required]
  })


  onSubmit(){
    this.isSubmitted = true;
    if(this.form.valid)
      this.service.login(this.form.value).subscribe({
        next:(res:any)=>                                           //In the next property , we can pass the success (call back having a single parameter response ) 
        {
          localStorage.setItem('token', res.token)
          this.router.navigateByUrl('/dashboard')
        },

        error:err=>{
          if(err.status===400)
            this.toastr.error('Incorrect email or password.','Login failed')
          else
            console.log('error  during login:\n', err);
        }
    
    
    
      })

  }



  hasDisplayableError(controlName: string): Boolean{
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted) || Boolean(control?.touched) || Boolean(control?.dirty);
  }


}
