import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressbookService } from '../addressbook.service';
import { Bfs } from '../bookforsale/bfs';
import { OrderService } from '../order.service';
import { OrderdetailsService } from '../orderdetails.service';
import { ShelfcartService } from '../shelfcart.service';
import { Adress } from './adress';


@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
obj:Bfs[]=[];
order_id:number=0;
add:Adress[]=[];
add1:Adress;
add2:Adress;
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
flag2:boolean=false;
adaddresshide:boolean=true;
radiovalue:string='';
cnt:number=0;
buttonColor = "black";
  buttonType = "buy";
  isCustomSize = false;
  buttonWidth = 240;
  buttonHeight = 40;
  isTop = window === window.top;

  constructor(private _addressdata:AddressbookService,private _shelfcartdata:ShelfcartService,private _router:Router,private _orddata:OrderService,private _orddetdata:OrderdetailsService) { }

  ngOnInit(): void {
    this.id=localStorage.getItem("id");

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
    this.billingaddress=new FormGroup({
      name:new FormControl(null),
      emailid:new FormControl(null),
      address_1:new FormControl(null,[Validators.required]),
      address_2:new FormControl(null,[Validators.required]),
      city:new FormControl(null,[Validators.required]),
      state:new FormControl(null,[Validators.required]),
      pincode:new FormControl(null,[Validators.required]),
      address_type:new FormControl('Others'),
      fk_customer_id:new FormControl(this.id)
  });

  this._shelfcartdata.getcart(this.id).subscribe((data:Bfs[])=>{
    this.obj=data;
    this.gettotal();
    this.billingaddress.patchValue({
      name:this.obj[0].customer_name,
      emailid:this.obj[0].customer_emailid
    });
    console.log('this obj',this.obj);
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
  onEditClick(address_id:number){
    this._router.navigate(['/editaddress',address_id]);
  }
  onRadioChange(){
    if(this.cnt==0){
      this.cnt=1;
    }
    // else{
    //   this.cnt=1;
    // }
  }
  onAddaddressClick(){
    if(this.flag2==false){
    this.flag2=true;
  }
  else{
    this.flag2=false;
  }
  }
  onaddaddress(){
    if (this.billingaddress.valid) {
      alert('Order will be shipped to above mentioned address ');
      this.adaddresshide=false;
    }

  }
  onRemoveClick(item:Bfs,id:number){
    if(confirm('Are you sure you want to remove this from cart?'))
      {
    this._shelfcartdata.deleteFromCart(id).subscribe((data:any)=>{
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
    });
  }
  }
  onDeselect(){
    this.radiovalue='';
    this.cnt=0;
  }

  onPlaceOrderClick(){
    console.log(this.radiovalue);
    if (this.cnt==0 && this.paymenttype!='' && this.billingaddress.valid) {
    this._addressdata.addAddressbook(this.billingaddress.value).subscribe((data:any)=>{
      console.log(data);
    if(data.affectedRows==1)
    {

   // let dateFormat = require('dateformat');
    this.placeordform=new FormGroup({
      order_date:new FormControl(Date()),
     // order_date:new FormControl(dateFormat(Date(), "dd-mm-yy h:MM:ss TT")),
      order_paymenttype:new FormControl(this.paymenttype),
      order_totalamount:new FormControl(this.total),
      fk_customer_id:new FormControl(this.id),
      fk_address_id:new FormControl(data.insertId)
    });

    this._orddata.addorder(this.placeordform.value).subscribe((data:any)=>{
      console.log(data);
      this.order_id=data.insertId;
      if(data.affectedRows==1)
       {
         alert('Order Successfully Placed');

         this._orddetdata.addOrderdetails(this.obj,data.insertId).subscribe((data:any)=>{
            console.log(data);
            this._shelfcartdata.multipledeleteFromCart(this.obj).subscribe((data:any)=>{
              console.log(data);
            });
        });
        //alert('Thank you for ordering!');
        this._router.navigate(['/checkout',this.order_id]);
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
    });

    }
    else if (this.cnt==1 && this.paymenttype!='') {
      this.placeordform=new FormGroup({
        order_date:new FormControl(Date()),
       // order_date:new FormControl(dateFormat(Date(), "dd-mm-yy h:MM:ss TT")),
        order_paymenttype:new FormControl(this.paymenttype),
        order_totalamount:new FormControl(this.total),
        fk_customer_id:new FormControl(this.id),
        fk_address_id:new FormControl(this.radiovalue)
      });

      this._orddata.addorder(this.placeordform.value).subscribe((data:any)=>{
        console.log(data);
        this.order_id=data.insertId;
        if(data.affectedRows==1)
         {
           alert('Order Placed');

           this._orddetdata.addOrderdetails(this.obj,data.insertId).subscribe((data:any)=>{
              console.log(data);
              this._shelfcartdata.multipledeleteFromCart(this.obj).subscribe((data:any)=>{
                console.log(data);
              });
          });
         // alert('Thank you for ordering!');
          this._router.navigate(['/checkout',this.order_id]);

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
    else if(this.paymenttype==''){
      alert('Please select Payment Mode');
    }
    else if(this.billingaddress.invalid){
      alert("Please fill address details properly");
    }

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
