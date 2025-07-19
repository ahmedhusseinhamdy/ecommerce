import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  resText!: string;
  loading: boolean = false;
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  })


  login(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      console.log(this.loginForm.value);//from object that contain all fromcontrols and its valud
      this._AuthService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false;
          //1-hold and save the token
          sessionStorage.setItem('token', res.token)
          //2-docode token 
          this._AuthService.decodetoken()
          //reprogramming routing  
          this._Router.navigate(['/home']);
        }, error: (err) => {
          console.log(err.error.message);
          this.resText = err.error.message;
          this.loading = false;
        }
      })
    } else {
      //the from is not valid 
      //mark all inputs with touch
      this.loginForm.markAllAsTouched()
      this.loginForm.setErrors({ missMatch: true })
    }
  }















}
