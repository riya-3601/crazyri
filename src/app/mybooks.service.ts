import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class MybooksService {

  url:string='http://localhost:3000/mybooks/';
  constructor(private _http:HttpClient) { }

  getBookforbarterbyCustomerid(id:String){
    return this._http.get(this.url+id);
  }

}
