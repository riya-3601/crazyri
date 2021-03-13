import { Component, OnInit } from '@angular/core';
import { Bfs } from "./bfs";
import { MatTableDataSource } from '@angular/material/table';
import { BookforsaleService } from "../bookforsale.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { SearchbookforsaleService } from '../searchbookforsale.service';

@Component({
  selector: 'app-bookforsale',
  templateUrl: './bookforsale.component.html',
  styleUrls: ['./bookforsale.component.css']
})
export class BookforsaleComponent implements OnInit {
  obj:Bfs[]=[];
  category_id:number=1;
  column:string[];
  searchcolumn: string[] = ['isbn','title','author','publisher'];
  dataSource: MatTableDataSource<Bfs>;
  constructor(private _bfsdata:BookforsaleService,private _searchdata:SearchbookforsaleService,private _router:Router,private _actRoute:ActivatedRoute) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.category_id=this._actRoute.snapshot.params['category_id'];
    console.log(this.category_id);
    this._bfsdata.getBookByCategoryID(this.category_id).subscribe((data:Bfs[])=>{
      this.obj=data;
      console.log(this.obj);
    });
  }
  onSearchClick(input,column){
    //console.log(input,column);
    this._searchdata.searchBookbyISBN(input,column).subscribe((data:any)=>{
      console.log(data);
    });
  }
  onbookClick(item:Bfs){
    console.log(item.book_id);
    this._router.navigate(['/bookforsaledetail',item.book_id]);
  }

}
