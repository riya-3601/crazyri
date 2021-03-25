import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
total:number=0;
i:number;
len:number;
  constructor(private _shelfcartdata:ShelfcartService,private _router:Router) { }

  ngOnInit(): void {
this.id=localStorage.getItem("id");
this.quantity=new FormGroup({
  quan:new FormControl()
});

    this._shelfcartdata.getcart(this.id).subscribe((data:Bfs[])=>{
      this.obj=data;
      this.len=this.obj.length;
      console.log(this.obj,this.len);
    });


  }


  gettotal=function ():number {

    for (let index = 0; index < this.len; index++) {
      console.log(index,"Hii from for");
      console.log(this.obj[index].book_price,this.obj[index].shelfcart_quantity);
      this.total+=this.obj[index].book_price*this.obj[index].shelfcart_quantity;
      console.log(this.total);

    }
    return this.total;
  }
  onUpdateCart(){
    console.log("Hifrom update cart");
    console.log(this.quantity.get('quan').value);
  }
  onRemoveClick(item:Bfs,id:number){
    this._shelfcartdata.deleteFromCart(id).subscribe((data:any)=>{
      if(confirm('Are you sure you want to remove this from cart?'))
      {
        if(data.affectedRows==1)
        {
          this.obj.splice(this.obj.indexOf(item),1);

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
  onCheckoutClick(){
    this._router.navigate(['/checkout']);
  }
}
