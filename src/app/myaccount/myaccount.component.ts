import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Cust } from '../login/cust';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  id:String;
  obj:Cust[];
  constructor(private custdata:CustomerService) { }

  ngOnInit(): void {

    this.id=localStorage.getItem("id");
    this.custdata.getCustomerinfoById(this.id).subscribe((data:Cust[])=>{
      this.obj=data;
      console.log(this.obj);

    });
  }

}
