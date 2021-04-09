import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Bfs } from '../bookforsale/bfs';
import { OrderService } from '../order.service';
import { OrderdetailsService } from '../orderdetails.service';
import { ShelfcartService } from '../shelfcart.service';
import { Ord } from './ord';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
obj:Bfs[]=[];
id:string;
shelfcart_id:number[];
quantity:FormGroup;
placeordform:FormGroup;
paymenttype:string='';
total:number=0;
qty:number[]=[1,2,3,4,5,6,7,8,9,10];
billingaddress:FormGroup;
city:string[]=['Ahmedabad','Surat','Rajkot','Gandhinagar','Surendranagar'];
flag:boolean=false;
flag1:boolean=false;
buttonColor = "black";
  buttonType = "buy";
  isCustomSize = false;
  buttonWidth = 240;
  buttonHeight = 40;
  isTop = window === window.top;

  constructor(private _shelfcartdata:ShelfcartService,private _router:Router,private _orddata:OrderService,private _orddetdata:OrderdetailsService) { }

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
    this.gettotal();
    this.billingaddress.patchValue({
      name:this.obj[0].customer_name,
      emailid:this.obj[0].customer_emailid
    });
    console.log(this.obj);
  });

  }

  onSelectionChange(item,i){
    console.log(this.obj);
   this.gettotal();
  }


  gettotal=function ():void {
    this.total=0;
    for (let index = 0; index < this.obj.length; index++) {

      this.total+=this.obj[index].book_price*this.obj[index].shelfcart_quantity;

    }
  }

  onRemoveClick(item:Bfs,id:number){
    this._shelfcartdata.deleteFromCart(id).subscribe((data:any)=>{
      if(confirm('Are you sure you want to remove this from cart?'))
      {
        if(data.affectedRows==1)
        {
          this.obj.splice(this.obj.indexOf(item),1);
          this.gettotal();
          alert('Removed successfully');
        }
        else
        {
          console.log(data);
          alert('Something went wrong');
        }
      }
    });
  }
  onaddaddress(){
    console.log(this.billingaddress.value);
  }
  onPlaceOrderClick(){
   // let dateFormat = require('dateformat');
    this.placeordform=new FormGroup({
      order_date:new FormControl(Date()),
     // order_date:new FormControl(dateFormat(Date(), "dd-mm-yy h:MM:ss TT")),
      order_paymenttype:new FormControl(this.paymenttype),
      order_totalamount:new FormControl(this.total),
      fk_customer_id:new FormControl(this.id),
      fk_address_id:new FormControl(99)
    });
    for (let index = 0; index < this.obj.length; index++) {
      this.shelfcart_id[index]= this.obj[index].shelfcart_id;

    }
    this._orddata.addorder(this.placeordform.value).subscribe((data:any)=>{
      console.log(data);
      if(data.affectedRows==1)
       {
         alert('Order Placed');

        //  this._orddetdata.addOrderdetails(this.obj,data.insertId).subscribe((data1:any)=>{
        //     console.log(data);
        // });
        this._shelfcartdata.multipledeleteFromCart(this.shelfcart_id).subscribe((data:any)=>{
          console.log(data);
        });
        //  this._router.navigate(['/home/order']);
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

  onCheckoutClick(){
    this.flag=true;
  }
  paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "VISA", "MASTERCARD"]
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
            gatewayMerchantId: "exampleGatewayMerchantId"
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant"
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "100.00",
      currencyCode: "USD",
      countryCode: "US"
    }
  };

  onLoadPaymentData(event) {
    console.log("load payment data", event.detail);
  }
}
