import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cust } from 'src/app/login/cust';
import { Forgetpassword } from './login/forgetpassword';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string='http://localhost:3000/login/';
  url1:string='http://localhost:3000/customer/';
  url2:string='http://localhost:3000/passwordmail/';
  constructor(private _http:HttpClient) { }
  getUser(obj:Cust){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
  getAllUsersforSignup(){
    return this._http.get(this.url);
  }
  addUser(obj:Cust){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url1,body,{headers:head});
  }
  getUserforgetpassword(email:String){
    return this._http.get(this.url2+email);
  }
  forgetpassword(sent:Forgetpassword){
    let body=JSON.stringify(sent);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url2,body,{headers:head});
  }

}
