import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchbookforsaleService {

  url:string='http://localhost:3000/searchbook/';
  url1:string='http://localhost:3000/searchbookforbarter/';

  constructor(private _http:HttpClient) { }
  searchBook(search:string,id:number){
    return this._http.get(this.url+search+"/"+id);
  }
  searchBookforbarter(search:string,id:number){
    return this._http.get(this.url1+search+"/"+id);
  }

}
