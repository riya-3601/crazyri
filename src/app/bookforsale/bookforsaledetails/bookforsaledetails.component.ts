import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bfs } from "src/app/bookforsale/bfs";
import { BookforsaleService } from "src/app/bookforsale.service";
import { BookforsaledatailsService } from 'src/app/bookforsaledatails.service';
import { ShelfcartService } from 'src/app/shelfcart.service';
@Component({
  selector: 'app-bookforsaledetails',
  templateUrl: './bookforsaledetails.component.html',
  styleUrls: ['./bookforsaledetails.component.css']
})
export class BookforsaledetailsComponent implements OnInit {
  username:String;
  id:String;
  book_id:number;
  obj:Bfs[];

  constructor(private _router:Router,private _bookdata:BookforsaleService,private _actRoute:ActivatedRoute,private _bookforsaledet:BookforsaledatailsService,private _shelfcartdata:ShelfcartService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username");
    this.id=localStorage.getItem("id");
    this.book_id=this._actRoute.snapshot.params['book_id'];
    console.log(this.book_id);

    this._bookforsaledet.getbookbarterById(this.book_id).subscribe((data:Bfs[])=>{
      this.obj=data;
      console.log(data);
    });
  }
  onAddCart(item,input){
    console.log(item.book_id);
    if(this.username!='' && this.username!=null){
    //console.log(input);
    this._shelfcartdata.getcartByCartid(item.book_id,this.id).subscribe((data:any)=>{
      console.log(data);
      if (data.length>=1) {
        alert("It is already their in cart")
      }
      else{
        if(item.book_status=='Unavailable'){
          alert("Selected book is unavailable hence cannot be added to cart");
        }
        else{
        if(input!=0){
        this._shelfcartdata.addincart(this.id,item,input).subscribe((data:any)=>{
          if(data.affectedRows==1)
           {
             alert('Data inserted succesfully');

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
        else{
          alert('Quantity should be greater than 0');
          }
        }
      }
    });
  }
    else{
      this._router.navigate(['/login']);
    }
  }
  onAddShelf(item){
    if(this.username!='' && this.username!=null){
     //console.log(input);
    this._shelfcartdata.addinshelf(this.id,item).subscribe((data:any)=>{
      if(data.affectedRows==1)
       {
         alert('Data inserted succesfully');

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
   else{
    this._router.navigate(['/login']);
    }
  }
}
