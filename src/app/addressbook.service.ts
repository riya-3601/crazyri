import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import { Adress } from './mycart/adress';

@Injectable({
  providedIn: 'root'
})
export class AddressbookService {

  url:string='http://localhost:3000/addressbycustomerid/';
  url1:string='http://localhost:3000/addressbook/';

  constructor(private _http:HttpClient) { }
  getAddressByCustomerId(id:string){
    return this._http.get(this.url+id);
  }
  addAddressbook(obj:Adress){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url1,body,{headers:head});
  }
  getAddressbookById(id:number){
    return this._http.get(this.url1+id);
  }
  editAddressbook(obj:Adress){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.put(this.url1,body,{headers:head});
  }
}
