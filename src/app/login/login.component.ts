import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Cust } from './cust';
import { Forgetpassword } from './forgetpassword';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup;
  signupform:FormGroup;
  obj:Cust[];
  obj1:Cust[];
  message:String;
  message1:String;
  hide:boolean=true;
  hide1:boolean=true;
  flag1:boolean=false;
  constructor(private _logdata:LoginService,private _router:Router) { }

  ngOnInit(): void {
    this.login=new FormGroup({
      login_username:new FormControl(null,[Validators.required,Validators.email]),
      login_password:new FormControl(null,[Validators.required])
      });
      this.signupform=new FormGroup({
        customer_emailid:new FormControl(null,[Validators.required,Validators.email]),
        password_group: new FormGroup(
          {
            customer_password: new FormControl(null, [Validators.required,Validators.pattern('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$')]),
            customer_confirmpassword: new FormControl(null, [Validators.required])
          },
          [this.matchPasswords.bind(this)]
        ),
       // customer_password:new FormControl(null,[Validators.required,Validators.maxLength(8)]),
        //signin_confirmpassword: new FormControl(null,Validators.required),
        customer_name:new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z0-9]*')]),
        customer_gender:new FormControl(null,Validators.required),
        customer_mobileno:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10)]),

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
  email:string='';
  onSignupClick(){
    console.log(this.signupform.value);
    this.email=this.signupform.get('customer_emailid').value;
    const userItem: Cust = new Cust(
      null,
      this.signupform.get("customer_emailid").value,
      this.signupform.get("password_group").get("customer_password").value,
      this.signupform.get("customer_name").value,
      this.signupform.get("customer_gender").value,
      this.signupform.get("customer_mobileno").value,
      null
    );

    this._logdata.getAllUsersforSignup().subscribe((data:any)=>{
      console.log(data);
      // for (let index = 0; index < data.length; index++) {
      //   if(this.email==data[0].customer_emailid){
      //     this.message1='Emailid is already used';
      //   }
      //   else{
      //     this.message1='';
      //   }
      // }
      // if(this.message1=='')
      // {
        this._logdata.addUser(userItem).subscribe((data:any)=>{
          console.log(data);
          if(data.affectedRows==1)
          {
            this.message1='';
            alert('New User Signed in Succesfully');
            alert('Please log in with your emailid and password');
            this._router.navigate(['/']);

          }
          else{
            //  alert('Something went wrong');
             this.message1='Emailid is already used';
              console.log(data);
           }
        });

    });
  }
  matchPasswords(control: AbstractControl): { [key: string]: boolean } {
    if (
      control.get("customer_password").value ===
      control.get("customer_confirmpassword").value
    ) {
      return null;
    }
    return { passwordMatchError: true };
  }
  flag:boolean=false;
  flag2:boolean=true;
  onforgotpasswordClick(){
    this.flag=true;
    this.flag2=false;
  }
  message2:string;;
  subject:string='Forgot Password';
  onSendClick(email){
    this._logdata.getUserforgetpassword(email).subscribe((data:Cust[])=>{
      console.log(data);
     this.obj1=data;
      if(this.obj1.length==1){
        this.flag=false;
        this.flag1=true;
        this.message2='Hello '+this.obj1[0].customer_name+'\nYour Password for your account on Booktering.com is: '+this.obj1[0].customer_password+'\n\nWith Regards from,\nTeam Booktering.com';
        this._logdata.forgetpassword(new Forgetpassword(email,this.message2,this.subject)).subscribe((data:any)=>{
          console.log(data);
        });
      }
      else{
        alert('No such emailid found');
        alert('Enter mailid that is connected to your account on booktering.com');
      }
    })
  }
}
