import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http:HttpClient) { }
  url:string='http://localhost:3000/customer/';

  getCustomerinfoById(id:String){
    return this._http.get(this.url+id);
  }
}
