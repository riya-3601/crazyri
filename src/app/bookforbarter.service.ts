import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookforbarterService {
  url:string='http://localhost:3000/bookforbarter/';
  constructor(private _http:HttpClient) { }
  getAllBookforbarterCustomer(){
    return this._http.get(this.url);
  }

  getBookforbarterbyCustomerid(id:String){
    return this._http.get(this.url+id);
  }

  addBookforbarter(obj:FormData){
    return this._http.post(this.url,obj);
  }
}
