import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cust } from 'src/app/login/cust';
import { Bfs } from './bookforsale/bfs';

@Injectable({
  providedIn: 'root'
})
export class ShelfcartService {
  url:string='http://localhost:3000/shelfcartincart/';
  url1:string='http://localhost:3000/shelfcartinshelf/';
  constructor(private _http:HttpClient) { }

  getcart(){
    return this._http.get(this.url);
  }
  getshelf(){
    return this._http.get(this.url1);
  }

  addincart(obj:Bfs,input:number){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url+input,body,{headers:head});
  }
  addinshelf(obj:Bfs){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url1,body,{headers:head});
  }

}
