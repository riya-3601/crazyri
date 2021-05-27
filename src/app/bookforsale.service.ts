import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookforsaleService {
  url:string='http://localhost:3000/bookforsalebycatid/';
  url1:string='http://localhost:3000/bookforsale/';

  constructor(private _http:HttpClient) { }

  getAllBooks()
  {
    return this._http.get(this.url1);
  }
  getBookByCategoryID(id:number){
    return this._http.get(this.url+id);
  }
}
