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
  constructor(private _http:HttpClient) { }
  addincart(obj:Bfs){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
}
