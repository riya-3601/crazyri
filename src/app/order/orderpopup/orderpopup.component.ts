import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderdetailsService } from 'src/app/orderdetails.service';
import { Ordmycart } from '../ordmycart';

@Component({
  selector: 'app-orderpopup',
  templateUrl: './orderpopup.component.html',
  styleUrls: ['./orderpopup.component.css']
})
export class OrderpopupComponent implements OnInit {
  obj:Ordmycart[]=[];
  constructor(public _orddetdata:OrderdetailsService, public dialogref:MatDialogRef<OrderpopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this._orddetdata.getAllOrderdetails(this.data).subscribe((data:Ordmycart[])=>{
      this.obj=data;
      console.log(this.obj);
    });
  }

}
