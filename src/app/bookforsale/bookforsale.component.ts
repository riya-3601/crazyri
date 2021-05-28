import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Bfs } from "./bfs";
import { MatTableDataSource } from '@angular/material/table';
import { BookforsaleService } from "../bookforsale.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { SearchbookforsaleService } from '../searchbookforsale.service';
import { CategoryService } from '../category.service';
import { Cat } from '../category/cat';
import { ShelfcartService } from '../shelfcart.service';

@Component({
  selector: 'app-bookforsale',
  templateUrl: './bookforsale.component.html',
  styleUrls: ['./bookforsale.component.css']
})
export class BookforsaleComponent implements OnInit {
  username:string;
  id:string;
  obj:Bfs[]=[];
  cat:Cat[]=[];
  category_id:number=1;
  category_name:String='';
  column:string='title';
  flag:boolean=false;
  message:string='';
  len:number=0;
  searchcolumn: string[] = ['isbn','title','author','publisher'];
  dataSource: MatTableDataSource<Bfs>;
  constructor(private _bfsdata:BookforsaleService,private catdata:CategoryService,private _searchdata:SearchbookforsaleService,private _router:Router,private _actRoute:ActivatedRoute,private _shelfcartdata:ShelfcartService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {

    this.username=localStorage.getItem("username");
    this.id=localStorage.getItem("id");
    this._actRoute.params.subscribe((data)=>{
      this.category_id=data.category_id;
      this.category_name=data.category_name;
      console.log(this.category_id);
      this._bfsdata.getBookByCategoryID(this.category_id).subscribe((data:Bfs[])=>{
        this.obj=data;
        console.log(this.obj);
      });
    });
    // this.category_id=this._actRoute.snapshot.params['category_id'];



    this.catdata.getAllCategory().subscribe((data:Cat[])=>{
      this.cat=data;
    });
  }
  onSearchClick(input,column){
    //console.log(input,column);
    this._searchdata.searchBook(input,column).subscribe((data:any)=>{
      this.obj=data;

      this.len=this.obj.length;
      console.log(this.len);
      if(this.len<=0){
        this.flag=true;
        console.log('inside if');
        this.message='No such data found';
      }
      else{
        this.flag=false;
        console.log('inside else');
      }
    });
  }
  @ViewChild('input') input1:ElementRef;
  onClearSearchClick(input){
    this.flag=false;
    this._bfsdata.getBookByCategoryID(this.category_id).subscribe((data:Bfs[])=>{
      this.obj=data;
      console.log(this.obj);
    });
    this.input1.nativeElement.value='';
  }
  onbookClick(item:Bfs){
    console.log(item.book_id);
    this._router.navigate(['/bookforsaledetail',item.book_id]);
  }
  onCategoryClick(item:Cat){
    console.log('Category evnt called');
    this._router.navigate(['/bookforsale',item.category_id,item.category_name]);

  }
  onAddCart(item){
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

     },

        function(err){
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
