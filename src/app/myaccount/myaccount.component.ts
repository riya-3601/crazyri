import { Component, OnInit } from '@angular/core';
import { CustomerService } from "src/app/customer.service";
import { Cust  } from "./cust";
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  id:string;
  username:string;
  obj:Cust[]=[];
  constructor(private _custdata:CustomerService) { }

  ngOnInit(): void {
   this.id=localStorage.getItem("id"+'');
   this.username=localStorage.getItem("username");
   console.log(this.id);
   this._custdata.getCustomerById(this.id).subscribe((data:Cust[])=>{
    this.obj=data;
    console.log(this.obj);
  });
}

}
