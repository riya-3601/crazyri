import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";

import { Bfs } from './bookforsale/bfs';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {
  url:string='http://localhost:3000/orderdetails/';
  constructor(private _http:HttpClient) { }



  addOrderdetails(obj:Bfs[],order_id:number){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url+order_id,body,{headers:head});
  }}
