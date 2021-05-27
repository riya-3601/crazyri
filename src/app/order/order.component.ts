import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Ordmycart } from './ordmycart';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OrderpopupComponent } from './orderpopup/orderpopup.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  id:string;
  obj:Ordmycart[]=[];
  constructor(private _orddata:OrderService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id=localStorage.getItem("id");


    this._orddata.getMyOrders(this.id).subscribe((data:Ordmycart[])=>{
      console.log(data);
      this.obj=data;
    });
  }
  openDialog(id:number){
    console.log(id);
  const abc =this.dialog.open(OrderpopupComponent, {
    data:id
  });

  abc.afterClosed().subscribe((x) => {
    console.log(x);
  });
}

}
