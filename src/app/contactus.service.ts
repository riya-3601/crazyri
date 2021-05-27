import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private _http:HttpClient) { }
  url:string='http://localhost:3000/contactus/';

  // getContactus(id:String){
  //   return this._http.get(this.url+id);
  // }
  addContactus(obj){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
}
