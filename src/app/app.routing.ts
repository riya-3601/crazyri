import { Routes,RouterModule } from "@angular/router";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { AddbookforbarterComponent } from "./addbookforbarter/addbookforbarter.component";

import { AuthguardService } from "./authguard.service";
import { BookforbarterComponent } from "./bookforbarter/bookforbarter.component";
import { BookforbarterdetailsComponent } from "./bookforbarter/bookforbarterdetails/bookforbarterdetails.component";

import { BookforsaleComponent } from './bookforsale/bookforsale.component';
import { BookforsaledetailsComponent } from './bookforsale/bookforsaledetails/bookforsaledetails.component';
import { CheckoutComponent } from "./checkout/checkout.component";
import { ContactusComponent } from "./contactus/contactus.component";
import { DemoComponent } from './demo/demo.component';
import { EditaddressComponent } from "./editaddress/editaddress.component";
import { EditbookforbarterComponent } from "./editbookforbarter/editbookforbarter.component";

import { LoginComponent } from "./login/login.component";
import { MyaccountComponent } from "./myaccount/myaccount.component";
import { MybooksComponent } from "./mybooks/mybooks.component";
import { MycartComponent } from "./mycart/mycart.component";
import { MyshelfComponent } from "./myshelf/myshelf.component";
import { OrderComponent } from "./order/order.component";
import { PlaceorderComponent } from "./placeorder/placeorder.component";
const arr:Routes=[
  {path:'',component:DemoComponent},

  {path:'bookforsale/:category_id',component:BookforsaleComponent},
  {path:'bookforsaledetail/:book_id',component:BookforsaledetailsComponent},
  {path:'bookforbarter',component:BookforbarterComponent},
  {path:'addbookforbarter',component:AddbookforbarterComponent},
  {path:'editbookforbarter/:bookbarter_id',component:EditbookforbarterComponent},
  {path:'bookforbarterdetails/:bookbarter_id',component:BookforbarterdetailsComponent},
  {path:'editaddress/:address_id',component:EditaddressComponent},
  {path:'mycart',component:MycartComponent,canActivate:[AuthguardService]},
  {path:'myshelf',component:MyshelfComponent,canActivate:[AuthguardService]},
  {path:'myaccount',component:MyaccountComponent,canActivate:[AuthguardService]},
  {path:'mybooks',component:MybooksComponent,canActivate:[AuthguardService]},
  {path:'myorders',component:OrderComponent,canActivate:[AuthguardService]},
  {path:'checkout/:order_id',component:CheckoutComponent,canActivate:[AuthguardService]},
  {path:'placeorder',component:PlaceorderComponent,canActivate:[AuthguardService]},
  {path:'contactus',component:ContactusComponent,canActivate:[AuthguardService]},
  {path:'aboutus',component:AboutusComponent,canActivate:[AuthguardService]},
  {path:'login',component:LoginComponent},

];
export const routingarr=RouterModule.forRoot(arr);
