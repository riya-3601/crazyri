import { Component, OnInit } from '@angular/core';
import { Bfs } from '../bookforsale/bfs';
import { ShelfcartService } from '../shelfcart.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
obj:Bfs[];
  constructor(private _shelfcartdata:ShelfcartService) { }

  ngOnInit(): void {
    this._shelfcartdata.getcart().subscribe((data:Bfs[])=>{
      this.obj=data;
      console.log(this.obj);
    });
  }

}
