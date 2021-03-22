import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Cust } from './cust';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup;
  signinform:FormGroup;
  obj:Cust[];
  message:String;
  constructor(private _logdata:LoginService,private _router:Router) { }

  ngOnInit(): void {
    this.login=new FormGroup({
      login_username:new FormControl(null,[Validators.required,Validators.email]),
      login_password:new FormControl(null,[Validators.required])
      });
      this.signinform=new FormGroup({
        signin_emailid:new FormControl(null,[Validators.required,Validators.email]),
        signin_password:new FormControl(null,Validators.required),
        signin_confirmpassword: new FormControl(null,Validators.required),
        signin_username:new FormControl(null,Validators.required),
        signin_gender:new FormControl(null,Validators.required),
        signin_mobileno:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),

      });


  }

  onsubmitClick(){
     this._logdata.getUser(this.login.value).subscribe((data:Cust[])=>{
      this.obj=data;
      console.log(this.obj);
      if(data.length==1){
        if(this.obj[0].customer_type==1){
          localStorage.setItem("username",this.obj[0].customer_emailid);
          localStorage.setItem("id",this.obj[0].customer_id+'');
          this._router.navigate(['/']);
        }
        else{
          this.message='Username or Password is Wrong';
      }
      }
      else{
          this.message='Username or Password is Wrong';
      }
    });
  }


}
