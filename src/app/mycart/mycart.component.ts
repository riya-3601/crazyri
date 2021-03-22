import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Bfs } from '../bookforsale/bfs';
import { ShelfcartService } from '../shelfcart.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
obj:Bfs[];
id:String;
quantity:FormGroup;
  constructor(private _shelfcartdata:ShelfcartService) { }

  ngOnInit(): void {
this.id=localStorage.getItem("id");
this.quantity=new FormGroup({
  quan:new FormControl(null)
});

    this._shelfcartdata.getcart(this.id).subscribe((data:Bfs[])=>{
      this.obj=data;
      console.log(this.obj);
    });
  }
  onUpdateCart(){
    console.log("Hifrom update cart");
    console.log(this.quantity.get('quan').value);
  }

}
