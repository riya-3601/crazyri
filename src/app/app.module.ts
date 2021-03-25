import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
import { routingarr } from "./app.routing";
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { CategoryComponent } from './category/category.component';
import { BookforsaleComponent } from './bookforsale/bookforsale.component';
import { BookforsaledetailsComponent } from './bookforsale/bookforsaledetails/bookforsaledetails.component';
import { BookforbarterComponent } from './bookforbarter/bookforbarter.component';
import { BookforbarterdetailsComponent } from './bookforbarter/bookforbarterdetails/bookforbarterdetails.component';
import { BookforbartercartpopupComponent } from './bookforbarter/bookforbartercartpopup/bookforbartercartpopup.component';
import { MycartComponent } from './mycart/mycart.component';
import { MyshelfComponent } from './myshelf/myshelf.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MybooksComponent } from './mybooks/mybooks.component';
import { AddbookforbarterComponent } from './addbookforbarter/addbookforbarter.component';
<<<<<<< HEAD
import { OrderComponent } from './order/order.component';
=======
import { CheckoutComponent } from './checkout/checkout.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';
>>>>>>> 936d3f521539355e36cc3c7cd10225ae1c9d2d67


@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CategoryComponent,
    BookforsaleComponent,
    BookforsaledetailsComponent,
    BookforbarterComponent,
    BookforbarterdetailsComponent,
    BookforbartercartpopupComponent,
    MycartComponent,
    MyshelfComponent,
    MyaccountComponent,
    MybooksComponent,
    AddbookforbarterComponent,
<<<<<<< HEAD
    OrderComponent
=======
    CheckoutComponent,
    PlaceorderComponent
>>>>>>> 936d3f521539355e36cc3c7cd10225ae1c9d2d67
  ],
  imports: [
    GooglePayButtonModule,
    BrowserModule,
    FormsModule,

    routingarr,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
