import { Component, OnInit } from '@angular/core';
import { BookforbarterService } from '../bookforbarter.service';
import { Bookbart } from './bookbart';

@Component({
  selector: 'app-bookforbarter',
  templateUrl: './bookforbarter.component.html',
  styleUrls: ['./bookforbarter.component.css']
})
export class BookforbarterComponent implements OnInit {
  obj:Bookbart[];
  constructor(private _bookbartdata:BookforbarterService) { }

  ngOnInit(): void {
    this._bookbartdata.getAllBookforbarterCustomer().subscribe((data:Bookbart[])=>{
      this.obj=data;
      console.log(this.obj);
    });
  }

}
