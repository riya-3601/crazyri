import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactusService } from '../contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
contactusform:FormGroup;
id:string;
  constructor(private _contdata:ContactusService) { }

  ngOnInit(): void {
    this.id=localStorage.getItem("id");
    this.contactusform=new FormGroup({
      contactus_id:new FormControl(null),
      contactus_name:new FormControl(null,[Validators.required]),
      contactus_emailid:new FormControl(null,[Validators.required,Validators.email]),
      contactus_message:new FormControl(null,[Validators.required,Validators.maxLength(300)]),
      fk_customer_id:new FormControl(this.id),
    });
  }
  onsubmitClick(){
    this._contdata.addContactus(this.contactusform.value).subscribe((data:any)=>{
      console.log(data);
    });
  }
}
