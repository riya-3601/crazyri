import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup;
  username:String;
  password:String;
 message:string='';
  hide:boolean=true;
  constructor(private _router:Router) { }

  ngOnInit(): void {
    this.login=new FormGroup({
      login_username:new FormControl(null,[Validators.required]),
      login_password:new FormControl(null,[Validators.required])
      });
  }
  onsubmitClick(){
    this.username=this.login.get('login_username').value;
    this.password=this.login.get('login_password').value;
    if(this.username=="admin@gmail.com" && this.password=="admin" || this.password=="Admin")
    {
      this._router.navigate(['/demo']);
    }
    else
    {
      alert('Wrong Username or Password');
    }


  }

  onClearClick(){
    this.login.get('login_username').reset('');
  }

}
