import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookforbarterdetailsService } from 'src/app/bookforbarterdetails.service';
import { Bookbart } from '../bookbart';

@Component({
  selector: 'app-bookforbarterdetails',
  templateUrl: './bookforbarterdetails.component.html',
  styleUrls: ['./bookforbarterdetails.component.css']
})
export class BookforbarterdetailsComponent implements OnInit {
  bookbarter_id;
  obj:Bookbart[];
  constructor(private _bookbartdet:BookforbarterdetailsService,private _actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.bookbarter_id=this._actRoute.snapshot.params['bookbarter_id'];
   // console.log(this.bookbarter_id);

    this._bookbartdet.getbookbarterById(this.bookbarter_id).subscribe((data:Bookbart[])=>{
      this.obj=data;
      console.log(data);
    });
  }


}
