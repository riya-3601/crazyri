import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchbookforsaleService {

  url:string='http://localhost:3000/searchbook/';

  constructor(private _http:HttpClient) { }
  searchBookbyISBN(search:string,id:number){
    return this._http.get(this.url+search+"/"+id);
  }

}
