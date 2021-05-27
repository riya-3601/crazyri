import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookforbarterService } from '../bookforbarter.service';
import { Bookbart } from './bookbart';
import { SearchbookforsaleService } from '../searchbookforsale.service';


@Component({
  selector: 'app-bookforbarter',
  templateUrl: './bookforbarter.component.html',
  styleUrls: ['./bookforbarter.component.css']
})
export class BookforbarterComponent implements OnInit {
  obj:Bookbart[]=[];
  column:string='title';
  id:string;
  message:string='';
  flag:boolean=false;
  len:number=0;
  searchcolumn: string[] = ['title','author','username'];

  constructor(private _bookbartdata:BookforbarterService,private _searchdata:SearchbookforsaleService,private _router:Router) {}

  ngOnInit(): void {
    this.id=localStorage.getItem("id");
    this._bookbartdata.getAllBookforbarterCustomer(this.id).subscribe((data:Bookbart[])=>{
      this.obj=data;
      console.log(this.obj);
    });
  }
  onBookClick(item){
    this._router.navigate(['/bookforbarterdetails',item.bookbarter_id]);
  }
  onSearch1Click(input,column){
    console.log(input,column);
    this._searchdata.searchBookforbarter(input,column).subscribe((data:any)=>{
      this.obj=data;
      console.log(this.obj);
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
    this._bookbartdata.getAllBookforbarterCustomer(this.id).subscribe((data:Bookbart[])=>{
      this.obj=data;
      console.log(this.obj);
    });
    this.input1.nativeElement.value='';
  }
  onMyBooksClick(){
    this._router.navigate(['/mybooks']);
  }

}

