import { Component, OnInit } from '@angular/core';
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
  column:string[];
  searchcolumn: string[] = ['title','author','username'];

  constructor(private _bookbartdata:BookforbarterService,private _searchdata:SearchbookforsaleService,private _router:Router) {}

  ngOnInit(): void {
    this._bookbartdata.getAllBookforbarterCustomer().subscribe((data:Bookbart[])=>{
      this.obj=data;
      console.log(this.obj);
    });
  }
  onBookClick(item){
    this._router.navigate(['/bookforbarterdetails',item.bookbarter_id]);
  }
  onSearch1Click(input,column){
    //console.log(input,column);
    this._searchdata.searchBook(input,column).subscribe((data:any)=>{
      this.obj=data;
      console.log(data);
    });
  }
  onMyBooksClick(){
    this._router.navigate(['/mybooks']);
  }

}

