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

}
