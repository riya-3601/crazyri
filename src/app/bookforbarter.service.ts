import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookforbarterService {
  url:string='http://localhost:3000/bookforbartercustomer/';
  constructor(private _http:HttpClient) { }
  getAllBookforbarterCustomer(){
    return this._http.get(this.url);
  }
}
