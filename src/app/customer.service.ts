import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import { Cust } from './login/cust';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http:HttpClient) { }
  url:string='http://localhost:3000/customer/';

  getCustomerinfoById(id:String){
    return this._http.get(this.url+id);
  }
  editCustomer(obj:Cust){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.put(this.url,body,{headers:head});
  }
}
