import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import { Bookbart } from './bookforbarter/bookbart';

@Injectable({
  providedIn: 'root'
})
export class BookforbarterService {
  url:string='http://localhost:3000/bookforbarter/';
  url1:string='http://localhost:3000/getbookforbarterfordisplaycust/';
  //url1:string='http://localhost:3000/getBookforbarterbyCustomerid/';
  constructor(private _http:HttpClient) { }
  //to get all books except of the logged in user
  getAllBookforbarterCustomer(id:string){
    return this._http.get(this.url1+id);
  }


  //patchvalue in edit
  getBookforbarterById(id:number){
    return this._http.get(this.url+id);
  }

  addBookforbarter(obj:FormData){
    return this._http.post(this.url,obj);
  }

  editBookforbarter(obj:FormData)
  {
  // let body=JSON.stringify(obj);
  // let head=new HttpHeaders().set(environment.headname,environment.headvalue);
  return this._http.put(this.url,obj);
  }
  editBookforbarterwithfile(obj:Bookbart){
    let  body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.put(this.url+obj.bookbarter_id,obj,{headers:head});

  }
}
