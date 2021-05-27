import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressbookService } from '../addressbook.service';
import { CustomerService } from '../customer.service';
import { Cust } from '../login/cust';
import { Adress } from '../mycart/adress';

@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.component.html',
  styleUrls: ['./editaddress.component.css']
})
export class EditaddressComponent implements OnInit {
  address_id=0;
  cust:Cust[]=[];
  addressform:FormGroup;
  applicant: any;
  id:string;
  constructor(private _actRoute:ActivatedRoute,private _editaddress:AddressbookService,private _router:Router,private _custdata:CustomerService) { }

  ngOnInit(): void {

    this.id=localStorage.getItem("id");

    this.addressform=new FormGroup({
      address_id:new FormControl(null),
      address_1:new FormControl(null,Validators.required),
      address_2:new FormControl(null,Validators.required),
      city:new FormControl(null,Validators.required),
      state:new FormControl(null,Validators.required),
      pincode:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      address_type:new FormControl(null),
      fk_customer_id:new FormControl(this.id),
    });
    this.address_id=this._actRoute.snapshot.params['address_id'];
    console.log(this.address_id);
    this._editaddress.getAddressbookById(this.address_id).subscribe((data:Adress[])=>{
      console.log(data);
      this.addressform.patchValue({
        address_id:data[0].address_id,
        address_1:data[0].address_1,
        address_2:data[0].address_2,
        city:data[0].city,
        state:data[0].state,
        pincode:data[0].pincode,
        address_type:data[0].address_type,
        fk_customer_id:this.id,
      });
    });
  }
  onEditAddressbook(){
    console.log(this.addressform.value);
    this._editaddress.editAddressbook(this.addressform.value).subscribe((data:any)=>{

      if(data.affectedRows==1)
       {
         alert('Data updated succesfully');
        this._router.navigate(['/mycart']);

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
  onCancleClick(){
    this._router.navigate(['/mycart']);
  }
}
