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
  searchcolumn: string[] = ['isbn','title','author','publisher'];
  dataSource: MatTableDataSource<Bookbart>;
  constructor(private _bookbartdata:BookforbarterService,private _searchdata:SearchbookforsaleService,private _router:Router) {
    this.dataSource = new MatTableDataSource();

  }

  ngOnInit(): void {
    this._bookbartdata.getAllBookforbarterCustomer().subscribe((data:Bookbart[])=>{
      this.obj=data;
      this.dataSource.data=data;
      console.log(this.obj);
    });
  }
  onViewClick(item:Bookbart){
    this._router.navigate(['/bookforbarterdetails',item.bookbarter_id]);
  }
  onSearch1Click(input,column){
    //console.log(input,column);
    this._searchdata.searchBookbyISBN(input,column).subscribe((data:any)=>{
      this.obj=data;
      console.log(data);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  onSearchClick(event){
    console.log(event);
  }

}
