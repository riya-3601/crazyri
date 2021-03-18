import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:String;
  constructor(private _router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username");
  }
  onLogoutClick(){
    localStorage.removeItem("username");
    alert('Are you sure you want to logout?');{
      this._router.navigate(['/']);
    }
  }

  // onBagClick(){
  //   this._router.navigate(['/mycart']);
  // }
}
