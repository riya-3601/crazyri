import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:String='';
  name:String='';
  constructor(private _router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username");
    this.name=localStorage.getItem("name");
    console.log('username',this.username);
    console.log('name',this.name);
  }
  onLogoutClick(){
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    this.name='';
    console.log(this.username);
    if(confirm('Are you sure you want to logout?')){
      alert('Successfully loged out');
      // this.username=null;
      this._router.navigate(['/']);

    }
  }

  // onBagClick(){
  //   this._router.navigate(['/mycart']);
  // }
}
