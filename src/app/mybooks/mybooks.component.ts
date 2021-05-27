import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
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
  constructor(private _bookbartdata:MybooksService ,private _router:Router ) { }

  ngOnInit(): void {
this.id=localStorage.getItem('id');

this._bookbartdata.getBookforbarterbyCustomerid(this.id).subscribe((data:Bookbart[])=>{
  this.obj=data;
  console.log(this.obj);
    });
  }
  onAddBookbartClick(){
    this._router.navigate(['addbookforbarter']);
  }
  onEditClick(item:Bookbart){
    this._router.navigate(['editbookforbarter',item.bookbarter_id]);
  }
  onDeleteClick(item:Bookbart){
   console.log(item.bookbarter_id);
   if(confirm('Are you sure you want to remove?'))
   {
    this._bookbartdata.deleteBookforbarter(item.bookbarter_id).subscribe((data:any)=>{
      console.log(data);

      if(data.affectedRows==1)
       {
         alert('Book removed from Mybooks');
         this.obj.splice(this.obj.indexOf(item),1);
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
}
