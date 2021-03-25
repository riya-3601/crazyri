import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Bfs } from '../bookforsale/bfs';
import { ShelfcartService } from '../shelfcart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
id:String;
obj:Bfs[];
billingaddress:FormGroup;
city:string[]=['Ahmedabad','Surat','Rajkot','Gandhinagar','Surendranagar'];
  constructor(private _shelfcartdata:ShelfcartService,private _router:Router) { }

  ngOnInit(): void {
    this.id=localStorage.getItem("id");

    this.billingaddress=new FormGroup({
        name:new FormControl(),
        emailid:new FormControl(),
        address1:new FormControl(),
        address2:new FormControl(),
        city:new FormControl(),
        state:new FormControl(),
        pincode:new FormControl(),
        addtype:new FormControl()
    });



    this._shelfcartdata.getcart(this.id).subscribe((data:Bfs[])=>{
      this.obj=data;
      this.billingaddress.patchValue({
        name:this.obj[0].customer_name,
        emailid:this.obj[0].customer_emailid
      });
      console.log(this.obj);
    });

  }
  onaddaddress(){
    console.log(this.billingaddress.value);
  }
  onPlaceOrderClick(){
    this._router.navigate(['/placeorder']);
  }

}
