import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService: AuthService ,private _Router:Router) { }
  check: boolean = false;
  LogedUserName!: string
  loged:boolean = false;

  ngOnInit(): void {
    this._AuthService.decodeUserToken()
    if (this._AuthService.userInfo) {

      this.LogedUserName = this._AuthService.userInfo.name;
      this.check = true;
    }
    this.updateUserState();

    if(sessionStorage.getItem('token')){
      this.loged = true;
    }
  }

  logOut(){
    this.check=false;
    sessionStorage.removeItem('token');
    this._Router.navigate(['/login']);
    this._AuthService.userInfo.name = "";
    this._AuthService.userInfo.id = "";
    this._AuthService.userInfo.role = "";
    this._AuthService.userInfo.iat = 0;
    this._AuthService.userInfo.exp = 0;
  }

  updateUserState(): void {
    if (this._AuthService.userInfo) {
      this.LogedUserName = this._AuthService.userInfo.name;
      this.check = !!this.LogedUserName; 
    } else {
      this.check = false;
    }
  }



}