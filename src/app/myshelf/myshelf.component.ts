import { Component, OnInit } from '@angular/core';
import { Bfs } from '../bookforsale/bfs';
import { ShelfcartService } from '../shelfcart.service';

@Component({
  selector: 'app-myshelf',
  templateUrl: './myshelf.component.html',
  styleUrls: ['./myshelf.component.css']
})
export class MyshelfComponent implements OnInit {
  id:String;
  obj:Bfs[];
  constructor(private _shelfcartdata:ShelfcartService) { }

  ngOnInit(): void {
    this.id=localStorage.getItem('id');
    this._shelfcartdata.getshelf(this.id).subscribe((data:Bfs[])=>{
      this.obj=data;
      console.log(this.obj);
    });
  }
  onAddCartfromShelf(item:Bfs[]){
    this._shelfcartdata.onAddCartfromShelf(item).subscribe((data:Bfs[])=>{
      this.obj=data;
      console.log(this.obj);
    });
  }
  onDeletefromshelfClick(item:Bfs){
    console.log(item.shelfcart_id);
    if(confirm('Are you sure you want to remove this from cart?'))
      {
    this._shelfcartdata.deleteFromShelf(item.shelfcart_id).subscribe((data:any)=>{
      console.log(data);

      if(data.affectedRows==1)
       {
         alert('Book removed from Myshelf');
         this.obj.splice(this.obj.indexOf(item),1);

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
}
