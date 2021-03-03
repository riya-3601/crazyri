import { Component, OnInit } from '@angular/core';
import { Bfs } from "./bfs";
import { BookforsaleService } from "../bookforsale.service";
import { Router } from "@angular/router";
import { FormGroup,FormControl } from "@angular//forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookforsale',
  templateUrl: './bookforsale.component.html',
  styleUrls: ['./bookforsale.component.css']
})
export class BookforsaleComponent implements OnInit {
  obj:Bfs[]=[];
  category_id:number=1;
  bfsform:FormGroup;
  constructor(private _bfsdata:BookforsaleService,private _router:Router,private _actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.category_id=this._actRoute.snapshot.params['category_id'];
    console.log(this.category_id);
    this._bfsdata.getBookByCategoryID().subscribe((data:Bfs[])=>{
      this.obj=data;
      console.log(this.obj);
    });
  }

}
