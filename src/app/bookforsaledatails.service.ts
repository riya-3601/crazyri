import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookforsaledatailsService {

  url:string='http://localhost:3000/bookforsale/';
  constructor(private _http:HttpClient) { }
  getbookbarterById(id:number){
    return this._http.get(this.url+id);
  }
}



