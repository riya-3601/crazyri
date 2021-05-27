import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Bookrev } from './bookforbarter/bookforbarterdetails/bookrev';

@Injectable({
  providedIn: 'root'
})
export class BookreviewService {
  url:string='http://localhost:3000/bookreview/';
  url1:string='http://localhost:3000/bookreviewbybookbarterid/';
  url2:string='http://localhost:3000/getBookreviewByCustomerrId/';



  constructor(private _http:HttpClient) { }
  addBookreview(obj:Bookrev){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
  getBookreviewByBookbarterIdCustomer(bookbarterid:number,customer_id:string){
    return this._http.get(this.url1+bookbarterid+'%'+customer_id);
  }
  getBookreviewByCustomerrId(bookbarterid:number,customer_id:string){
    return this._http.get(this.url2+bookbarterid+'%'+customer_id);
  }
  deleteBookreview(id:number){
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.delete(this.url+id,{headers:head});
  }
  editBookreview(obj:Bookrev)
{
  let body=JSON.stringify(obj);
  let head=new HttpHeaders().set(environment.headname,environment.headvalue);
  return this._http.put(this.url,body,{headers:head});
}
getBookreviewById(id:number){
  return this._http.get(this.url+id);
}
}
