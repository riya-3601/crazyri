import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bfs } from "src/app/bookforsale/bfs";
import { BookforsaleService } from "src/app/bookforsale.service";
import { BookforsaledatailsService } from 'src/app/bookforsaledatails.service';
@Component({
  selector: 'app-bookforsaledetails',
  templateUrl: './bookforsaledetails.component.html',
  styleUrls: ['./bookforsaledetails.component.css']
})
export class BookforsaledetailsComponent implements OnInit {
  book_id:number;
  obj:Bfs[];
  cart:Bfs[]=[];
  constructor(private _bookdata:BookforsaleService,private _actRoute:ActivatedRoute,private _bookforsaledet:BookforsaledatailsService) { }

  ngOnInit(): void {
    this.book_id=this._actRoute.snapshot.params['book_id'];
    console.log(this.book_id);

    this._bookforsaledet.getbookbarterById(this.book_id).subscribe((data:Bfs[])=>{
      this.obj=data;
      console.log(data);
    });
  }
  onAddCart(item){
    confirm("Are you sure you want to add this item in cart?");{
      this.cart.push(item);
      console.log(this.cart);
      alert("Successfully added");
    }

  }

}
