import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from "jwt-decode";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   useremail!: string
  open: boolean = false
  resetCode !: string

  @ViewChild('login') login!: ElementRef
  @ViewChild('changeForm') changeForm !: ElementRef



  constructor(private _AuthService: AuthService, private _Router: Router, private toastr: ToastrService) { }
  restext: string = ''
  statusMs: string = ''
  loading: boolean = false


  @ViewChild('resetpassword') resetpassword!: ElementRef

  loginform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  })


  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  })

  resetPasswordData() {
    if (this.resetPasswordForm.valid) {
      this._AuthService.ResetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('The password has been reset')
          this.resetpassword.nativeElement.classList.add("hidden");
          this.login.nativeElement.classList.remove("hidden");
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.message)
          this.loading = false
        }
      })
    } else {
      this.resetPasswordForm.markAllAsTouched()
    }
  } 
  
  showdata(): void {
    if (this.loginform.valid) {
      this.loading = true
      console.log(this.loginform);
      console.log(this.loginform.value);
      this._AuthService.signIn(this.loginform.value).subscribe({
        next: (res) => {
          this.loading = false
          sessionStorage.setItem('token', res.token)
          this._AuthService.decodeUserToken()
          this._Router.navigate(['/home'])
        },
        error: (err) => {
          console.log(err);
          this.restext = err.error.message
          this.loading = false
        }
      })
    } else {
      this.loginform.markAllAsTouched();
    }
  }

  ForgetUserPassword() {
    console.log(this.useremail);
    this._AuthService.ForgotPassword(this.useremail).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message, "",
          {
            closeButton: true,
            timeOut: 5000,

          })
        this.showWindow()
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message)

      }
    })
  }

  VerifyCode() {
    this._AuthService.VerifyResetCode(this.resetCode).subscribe({
      next: (res) => {
        console.log(res);
        this.resetpassword.nativeElement.classList.remove("hidden");
        this.login.nativeElement.classList.add("hidden");
        this.toastr.success(res.status, "",)
        this.open = false
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message, "",)
      }
    })
  }

  showWindow() {
    this.open = true


  }

  closeWindo(e: Event) {

    if (e.target == e.currentTarget) {

      this.open = false
    }

  }


}

