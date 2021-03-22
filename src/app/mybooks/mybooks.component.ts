import { Component, OnInit } from '@angular/core';
import { BookforbarterService } from '../bookforbarter.service';
import { Bookbart } from '../bookforbarter/bookbart';
import { MybooksService } from '../mybooks.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css']
})
export class MybooksComponent implements OnInit {
id:String;
obj:Bookbart[];
  constructor(private _bookbartdata:MybooksService) { }

  ngOnInit(): void {
this.id=localStorage.getItem('id');

this._bookbartdata.getBookforbarterbyCustomerid(this.id).subscribe((data:Bookbart[])=>{
  this.obj=data;
  console.log(this.obj);
});
  }

}
