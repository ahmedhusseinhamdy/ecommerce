import { AuthService } from './../../core/services/authentication/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  resText!: string;
  loading: boolean = false;
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  registerform: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, this.compare);
  //custome validation
  compare(fgroup: AbstractControl) {
    //1-get form control (password).value //2-get form control (repassword).value //3-compre (if)
    //4-match return null //5-if not match return {missMatch true}
    return fgroup.get('password')?.value === fgroup.get('rePassword')?.value ? null : { missMatch: true }
  }
  register(): void {
    if (this.registerform.valid) {
      this.loading = true
      console.log(this.registerform.value);//from object that contain all fromcontrols and its valud
      this._AuthService.signUp(this.registerform.value).subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false;
          //reprogramming routing 
          this._Router.navigate(['/login']);
        }, error: (err) => {
          console.log(err.error.message);
          this.resText = err.error.message;
          this.loading = false;
        }
      })
    } else {
      //the from is not valid 
      //mark all inputs with touch
      this.registerform.setErrors({ missMatch: true });
      this.registerform.markAllAsTouched();
    }
  }

}