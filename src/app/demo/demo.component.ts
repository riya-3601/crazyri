import { Component, OnInit } from '@angular/core';
import { CategoryService } from "src/app/category.service";
import { BookforsaleService } from "src/app/bookforsale.service";
import { Cat } from "src/app/category/cat";
import { Router } from "@angular/router";

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  obj:Cat[]=[];
  constructor(private _catdata:CategoryService,private _bookdata:BookforsaleService,private _router:Router,private _actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._catdata.getAllCategory().subscribe((data:Cat[])=>{
      console.log(data);
      this.obj=data;

    });
  }
  onCategoryClick(item:Cat){
    console.log(item.category_id);
    this._router.navigate(['/books',item.category_id]);

  }

}
