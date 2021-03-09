import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookforbarterService } from '../bookforbarter.service';
import { Bookbart } from './bookbart';

@Component({
  selector: 'app-bookforbarter',
  templateUrl: './bookforbarter.component.html',
  styleUrls: ['./bookforbarter.component.css']
})
export class BookforbarterComponent implements OnInit {
  obj:Bookbart[]=[];
  dataSource: MatTableDataSource<Bookbart>;
  constructor(private _bookbartdata:BookforbarterService,private _router:Router) {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

}
