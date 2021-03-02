import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import { Cat } from "./category/cat";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url:string='http://localhost:3000/category/';

  constructor(private _http:HttpClient) { }
  getAllCategory(){
    return this._http.get(this.url);
  }
}
