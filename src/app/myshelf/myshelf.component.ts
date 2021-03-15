import { Component, OnInit } from '@angular/core';
import { Bfs } from '../bookforsale/bfs';
import { ShelfcartService } from '../shelfcart.service';

@Component({
  selector: 'app-myshelf',
  templateUrl: './myshelf.component.html',
  styleUrls: ['./myshelf.component.css']
})
export class MyshelfComponent implements OnInit {
  obj:Bfs[];
  constructor(private _shelfcartdata:ShelfcartService) { }

  ngOnInit(): void {
    this._shelfcartdata.getshelf().subscribe((data:Bfs[])=>{
      this.obj=data;
      console.log(this.obj);
    });
  }

}
