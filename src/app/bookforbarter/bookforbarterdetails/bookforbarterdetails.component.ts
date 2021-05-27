import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookforbarterdetailsService } from 'src/app/bookforbarterdetails.service';
import { BookreviewService } from 'src/app/bookreview.service';
import { Bookbart } from '../bookbart';
import { Bookrev } from './bookrev';

@Component({
  selector: 'app-bookforbarterdetails',
  templateUrl: './bookforbarterdetails.component.html',
  styleUrls: ['./bookforbarterdetails.component.css']
})
export class BookforbarterdetailsComponent implements OnInit {
  bookbarter_id:number;
  obj:Bookbart[];
  obj1:Bookrev[];
  obj2:Bookrev[];
  id:string;
  flag:boolean=false;
  bookreviewadd:FormGroup;
  constructor(private _router:Router,private _bookbartdet:BookforbarterdetailsService,private _actRoute:ActivatedRoute,private _bookrevdata:BookreviewService) { }

  ngOnInit(): void {
    this.id=localStorage.getItem("id");
    this.bookbarter_id=this._actRoute.snapshot.params['bookbarter_id'];
   // console.log(this.bookbarter_id);
   this.bookreviewadd=new FormGroup({
    bookreview_id:new FormControl(null,[Validators.required,Validators.maxLength(200)]),
    bookreview_description:new FormControl(null,[Validators.required]),
    bookreview_date:new FormControl(Date()),
    fk_bookbarter_id:new FormControl(this.bookbarter_id),
    fk_customer_id:new FormControl(this.id),

  });

    this._bookbartdet.getbookbarterById(this.bookbarter_id).subscribe((data:Bookbart[])=>{
      this.obj=data;
      console.log(data);
    });

    this._bookrevdata.getBookreviewByBookbarterIdCustomer(this.bookbarter_id,this.id).subscribe((data:Bookrev[])=>{
      this.obj2=data;
      console.log(this.obj2);
    });
    this._bookrevdata.getBookreviewByCustomerrId(this.bookbarter_id,this.id).subscribe((data:Bookrev[])=>{
      this.obj1=data;
      console.log(this.obj1);
    });
  }
  onPostClick(input)
  {
    if(input==''){
      alert("Please enter review");
    }
    else
    {
    this._bookrevdata.addBookreview(new Bookrev(null,input,Date(),this.bookbarter_id,this.id)).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row successfully inserted');
       this._bookrevdata.getBookreviewByBookbarterIdCustomer(this.bookbarter_id,this.id).subscribe((data:Bookrev[])=>{
        this.obj2=data;
        console.log(this.obj2);
      });
      }
      else
      {
        alert('Something went wrong');
        console.log(data);
      }
    },function(err){
      console.log(err);
    });
    }
  }

  onDeleteBookreview(item:Bookrev){
  if(confirm('Are you sure you want to remove this Review?'))
      {
    this._bookrevdata.deleteBookreview(item.bookreview_id).subscribe((data:any)=>{
      console.log(data);

      if(data.affectedRows==1)
       {
         alert('Book Review Removed');
         this.obj2.splice(this.obj2.indexOf(item),1);

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
onEditBookreview(bookreview_id:number){
  this.flag=true;
  this._bookrevdata.getBookreviewById(bookreview_id).subscribe((data:any)=>{
    console.log(data);
    this.bookreviewadd.patchValue({
      bookreview_id:data[0].bookreview_id,
      bookreview_description:data[0].bookreview_description,
      bookreview_date:data[0].bookreview_date,
      fk_bookbarter_id:data[0].fk_bookbarter_id,
      fk_customer_id:data[0].fk_customer_id,
    });
  });
}
onPostClick1(){
  console.log(this.bookreviewadd.value);
  this._bookrevdata.editBookreview(this.bookreviewadd.value).subscribe((data:any)=>{
    if(data.affectedRows==1)
    {
     // this.obj.push(this.bookforbarteradd.value);
     alert('Row updated successfully');
     this.flag=false;
     this._bookrevdata.getBookreviewByBookbarterIdCustomer(this.bookbarter_id,this.id).subscribe((data:Bookrev[])=>{
      this.obj2=data;
      console.log(this.obj2);
    });
    //  this._router.navigate(['/home/bookreview']);
    }
    else
    {
      alert('Something went wrong');
    }
  },function(err){
    console.log(err);
  });

}

}
