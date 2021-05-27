import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressbookService } from '../addressbook.service';
import { CustomerService } from '../customer.service';
import { Cust } from '../login/cust';
import { Adress } from '../mycart/adress';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  flag:boolean=false;
  id:string;
  obj:Cust[];

  add1:Adress;
add2:Adress;
add:Adress[]=[];
  accountform:FormGroup;
  hide:boolean=true;
  constructor(private custdata:CustomerService,private _addressdata:AddressbookService,private _router:Router) { }
  ngOnInit(): void {
    this.accountform=new FormGroup({
      customer_id:new FormControl(null),
      customer_emailid:new FormControl(null,[Validators.required,Validators.email]),
      customer_password:new FormControl(null,[Validators.required,Validators.maxLength(8)]),
      customer_name:new FormControl(null,[Validators.required]),
      customer_gender:new FormControl(null,[Validators.required]),
      customer_mobileno:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10)]),

    });
    this.id=localStorage.getItem("id");
    this.custdata.getCustomerinfoById(this.id).subscribe((data:Cust[])=>{
      this.obj=data;
      console.log(this.obj);
    });
    this._addressdata.getAddressByCustomerId(this.id).subscribe((data:Adress[])=>{

      this.add=data;
      console.log('from address',this.add);
      for (let index = 0; index < this.add.length; index++) {
        if (this.add[index].address_type=='Home') {
          this.add1=this.add[index];
        }
        if (this.add[index].address_type=='Office') {
          this.add2=this.add[index];
        }
      }
    });
  }
  onEditaddressClick(address_id:number){
    this._router.navigate(['/editaddress',address_id]);
  }
  onEditClick(){
    this.flag=true;
    this.custdata.getCustomerinfoById(this.id).subscribe((data:Cust[])=>{
      this.obj=data;
      console.log(this.obj);
      this.accountform.patchValue({
        customer_id:this.id,
        customer_emailid:data[0].customer_emailid,
        customer_password:data[0].customer_password,
        customer_name:data[0].customer_name,
        customer_gender:data[0].customer_gender,
        customer_mobileno:data[0].customer_mobileno

      });
    });
  }
  onsubmitClick(){
    if(confirm('Are you sure you want to update your account details?'))
    {
    this.custdata.editCustomer(this.accountform.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
       {
         alert('Account details updated succesfully');
         this.flag=false;
       }
       else{
         alert('Something went wrong');
         console.log(data);
       }

     },
     function(err){
       console.log(err);

    });
  }
}

  onClearClick(){
    this.accountform.get('customer_emailid').reset('');
  }
  onClearPriceClick(){
    this.accountform.get('customer_mobileno').reset('');
  }
  onClearAuthorClick(){
    this.accountform.get('customer_name').reset('');
  }
  onCancelClick(){
    this.flag=false;
  }
}
