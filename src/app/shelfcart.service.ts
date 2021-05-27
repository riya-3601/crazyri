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

  getcart(id:String){
    return this._http.get(this.url+id);
  }
  getshelf(id:String){
    return this._http.get(this.url1+id);
  }
  getcartByCartid(book_id:number,customer_id:String){
    return this._http.get(this.url+book_id+'/'+customer_id);
  }

  addincart(id:String,obj:Bfs,input:number){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url+id+'/'+input,body,{headers:head});
  }
  addinshelf(id:String,obj:Bfs){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url1+id,body,{headers:head});
  }
  onAddCartfromShelf(item){
    let body=JSON.stringify(item);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.put(this.url1,body,{headers:head});
  }
  deleteFromShelf(id:number){
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.delete(this.url1+id,{headers:head});
  }

  deleteFromCart(id:number){
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.delete(this.url+id,{headers:head});
  }
  multipledeleteFromCart(obj:Bfs[]){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,obj,{headers:head});
  }
}
