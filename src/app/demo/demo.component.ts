import { Component, OnInit } from '@angular/core';
import { CategoryService } from "src/app/category.service";
import { BookforsaleService } from "src/app/bookforsale.service";
import { Cat } from "src/app/category/cat";
import { Router } from "@angular/router";
import { SearchbookforsaleService } from '../searchbookforsale.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  username:String;
  obj:Cat[]=[];
  column:string[];
  searchcolumn: string[] = ['isbn','title','author','publisher'];
  constructor(private _catdata:CategoryService,private _searchdata:SearchbookforsaleService,private _bookdata:BookforsaleService,private _router:Router,private _actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username");
    alert('Welcome '+this.username);
    this._catdata.getAllCategory().subscribe((data:Cat[])=>{
      console.log(data);
      this.obj=data;

    });
  }
  onSearchClick(input,column){
    //console.log(input,column);
    this._searchdata.searchBookbyISBN(input,column).subscribe((data:any)=>{
      this.obj=data;
      console.log(data);
    });
  }
  onCategoryClick(item:Cat){
    console.log(item.category_id);
    this._router.navigate(['/bookforsale',item.category_id]);

  }

}
