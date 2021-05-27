import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import { Ord } from './mycart/ord';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url:string='http://localhost:3000/order/';
  url1:string='http://localhost:3000/myorders/';
  constructor(private _http:HttpClient) { }

  addorder(obj:Ord){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
  getMyOrders(id:string){
    return this._http.get(this.url1+id);
  }
}
