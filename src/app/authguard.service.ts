import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private _routdata:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    console.log(localStorage.getItem("username"));
    if(localStorage.getItem("username")!='' && localStorage.getItem("username")!=null){
      console.log('from authguard');
      return true;
    }
    console.log(localStorage.getItem("id"+''));
    if(localStorage.getItem("id")!='' && localStorage.getItem("id")!=null){
      console.log('from authguard');
      return true;
    }


      this._routdata.navigate(['/login']);
   return false;


   }
 }

