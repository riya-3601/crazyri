import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bfs } from '../bookforsale/bfs';
import { ShelfcartService } from '../shelfcart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
id:String;
order_id:number;
  constructor(private _shelfcartdata:ShelfcartService,private _actRoute:ActivatedRoute,private _router:Router) { }

  ngOnInit(): void {
    this.id=localStorage.getItem("id");
    this.order_id=this._actRoute.snapshot.params['order_id'];
  }

  onMyordersClick(){
    this._router.navigate(['/myorders']);
  }
  onHomeClick(){
    this._router.navigate(['/']);
  }
}
