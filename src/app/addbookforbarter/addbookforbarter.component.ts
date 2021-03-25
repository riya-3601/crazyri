import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { BookforbarterService } from "src/app/bookforbarter.service";

import { Bookbart } from '../bookforbarter/bookbart';
import { Cust } from '../login/cust';


@Component({
  selector: 'app-addbookforbarter',
  templateUrl: './addbookforbarter.component.html',
  styleUrls: ['./addbookforbarter.component.css']
})
export class AddbookforbarterComponent implements OnInit {
  bookforbarteradd:FormGroup;
  flag: boolean = false;
  obj:Bookbart[]=[];
  cust:Cust[]=[];
  selectedfile:File=null;
  id:string;
  constructor(private _router:Router,private _bookbartdata:BookforbarterService) { }

  ngOnInit(): void {
    this.id=localStorage.getItem("id");

    this.bookforbarteradd=new FormGroup({
      bookbarter_id:new FormControl(null,[Validators.required]),
      bookbarter_title:new FormControl(null,[Validators.required]),
      bookbarter_author:new FormControl(null,[Validators.required]),
      bookbarter_description:new FormControl(null,[Validators.required,Validators.maxLength(200)]),
      bookbarter_status:new FormControl(null,[Validators.required]),
      bookbarter_price:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      bookbarter_image:new FormControl(null),
      fk_customer_id:new FormControl(null,[Validators.required]),
    });


  }
  onsubmitClick()
  {
    const fd=new FormData();
    fd.append('bookbarter_title',this.bookforbarteradd.get('bookbarter_title').value);
    fd.append('bookbarter_author',this.bookforbarteradd.get('bookbarter_author').value);
    fd.append('bookbarter_description',this.bookforbarteradd.get('bookbarter_description').value);
    fd.append('bookbarter_status',this.bookforbarteradd.get('bookbarter_status').value);
    fd.append('bookbarter_price',this.bookforbarteradd.get('bookbarter_price').value);
    fd.append('bookbarter_image',this.selectedfile,this.selectedfile.name);
    fd.append('fk_customer_id',this.id);
    console.log(fd);


    this._bookbartdata.addBookforbarter(fd).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row successfully inserted');
       this._router.navigate(['mybooks']);
      }
      else
      {
        alert('Something went wrong');

      }
    },function(err){
      console.log(err);
    });
  }
  onCancelClick(): void {
    //this.flag = false;
    if(confirm('Are you sure you want to cancel?')){
      this._router.navigate(['/mybooks']);
    }
  }
  onClearClick(){
    this.bookforbarteradd.get('bookbarter_title').reset('');
  }
  onClearPriceClick(){
    this.bookforbarteradd.get('bookbarter_price').reset('');
  }
  onClearAuthorClick(){
    this.bookforbarteradd.get('bookbarter_author').reset('');
  }
  onClearDescClick(){
    this.bookforbarteradd.get('bookbarter_description').reset('');
  }
  onFileAdd(value){
    this.selectedfile=<File>value.target.files[0];
   }

}
