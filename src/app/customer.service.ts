import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url:string='http://localhost:3000/customer/';
  constructor(private _http:HttpClient) { }
  getCustomerById(id:string){
    return this._http.get(this.url+id);
  }
}
