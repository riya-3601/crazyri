import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from "src/app/category.service";
import { BookforsaleService } from "src/app/bookforsale.service";
import { Cat } from "src/app/category/cat";
import { Router } from "@angular/router";
import { SearchbookforsaleService } from '../searchbookforsale.service';

import { ActivatedRoute } from '@angular/router';
import { BookforsaledatailsService } from '../bookforsaledatails.service';
import { Bfs } from '../bookforsale/bfs';
import { ShelfcartService } from '../shelfcart.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  username:String;
  flag:boolean=true;
  flag2:boolean=true;
  message:string='';
  id:string;
  temp1:boolean;
  temp2:boolean;
  len:number=0;
  obj:Cat[]=[];
  obj1:Bfs[]=[];
  obj2:Bfs[]=[];
  column:string='title';
  searchcolumn: string[] = ['isbn','title','author','publisher'];
  constructor(private _catdata:CategoryService,private _shelfcartdata:ShelfcartService,private _bfsdata:BookforsaleService,private _searchdata:SearchbookforsaleService,private _bookdata:BookforsaleService,private _router:Router,private _actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username");
    this.id=localStorage.getItem("id");
    // alert('Welcome '+this.username);
    this._catdata.getAllCategory().subscribe((data:Cat[])=>{
      console.log(data);
      for (let index = 0; index < 6; index++) {
        this.obj[index] = data[index];
      }
    });

    this._bfsdata.getAllBooks().subscribe((data:Bfs[])=>{

      for (let index = 0; index < 4; index++) {
        this.obj1[index] = data[index];
        }
      //this.obj1=data;
      console.log(this.obj1);
    });
  }
  onClickAllBooks(){
    if(this.flag2==true){
    this._bfsdata.getAllBooks().subscribe((data:Bfs[])=>{
      this.obj1=data;
      console.log('from all',this.obj1);
    });
    console.log('inside if',this.flag2);
    this.flag2=false;
  }
  else{
    this.obj1=[];
      this._bfsdata.getAllBooks().subscribe((data:Bfs[])=>{

        for (let index = 0; index < 4; index++) {
          this.obj1[index] = data[index];
          }
          console.log(this.obj1);
        //this.obj1=data;
      });
      console.log('inside else',this.flag2);
        this.flag2=true;
  }
}

  onClickAllCategories(){
    this.flag=false;
    this._catdata.getAllCategory().subscribe((data:Cat[])=>{
      console.log(data);
        this.obj=data;

    });
  }

  onSearchClick(input,column){
    //console.log(input,column);
    this._searchdata.searchBook(input,column).subscribe((data:any)=>{

      this.obj2=data;
     // console.log(data);
      this.len=this.obj2.length;
      console.log(this.len);
      if(this.len==0){
        this.temp1=true;
        console.log('inside if');
        this.message='No such data found';
      }
      else if (this.len>0) {
        this.temp1=false;
        console.log('inside else');
      }
    });
  }
  @ViewChild('input') input1:ElementRef;
  onClearSearchClick(){
    console.log('hello from search');
    this.temp1=false;
    this.obj2=[];
    this.input1.nativeElement.value='';
  }


  onbookClick(item:Bfs){
    console.log(item.book_id);
    this._router.navigate(['/bookforsaledetail',item.book_id]);
  }
  onCategoryClick(item:Cat){
    console.log(item.category_id,item.category_name);
    this._router.navigate(['/bookforsale',item.category_id,item.category_name]);

  }

  onAddCart(item,input){
    if(this.username!='' && this.username!=null){
    //console.log(input);
    this._shelfcartdata.getcartByCartid(item.book_id,this.id).subscribe((data:any)=>{
      console.log(data);
      if (data.length>=1) {
        alert("It is already their in cart")
      }
      else{
        if(item.book_status=='Unavailable'){
          alert("Selected book is unavailable hence cannot be added to cart");
         }
        else{
          this._shelfcartdata.addincart(this.id,item,1).subscribe((data:any)=>{
          if(data.affectedRows==1)
          {
            alert('Data inserted succesfully');
           }
          else{
            alert('Something went wrong');
            console.log(data);
           }
          },function(err){
          console.log(err);
          });
        }
       }
      });
    }

    else{
      this._router.navigate(['/login']);
    }
  }
  onAddShelf(item){
    if(this.username!='' && this.username!=null){
     //console.log(input);
    this._shelfcartdata.addinshelf(this.id,item).subscribe((data:any)=>{
      if(data.affectedRows==1)
       {
         alert('Data inserted succesfully');

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
   else{
    this._router.navigate(['/login']);
    }
  }


}
