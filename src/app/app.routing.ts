import { Routes,RouterModule } from "@angular/router";
import { AddbookforbarterComponent } from "./addbookforbarter/addbookforbarter.component";
import { AuthguardService } from "./authguard.service";
import { BookforbarterComponent } from "./bookforbarter/bookforbarter.component";
import { BookforbarterdetailsComponent } from "./bookforbarter/bookforbarterdetails/bookforbarterdetails.component";
import { BookforbarterdetailsService } from "./bookforbarterdetails.service";
import { BookforsaleComponent } from './bookforsale/bookforsale.component';
import { BookforsaledetailsComponent } from './bookforsale/bookforsaledetails/bookforsaledetails.component';
import { CheckoutComponent } from "./checkout/checkout.component";
import { DemoComponent } from './demo/demo.component';
import { LoginComponent } from "./login/login.component";
import { MyaccountComponent } from "./myaccount/myaccount.component";
import { MybooksComponent } from "./mybooks/mybooks.component";
import { MycartComponent } from "./mycart/mycart.component";
import { MyshelfComponent } from "./myshelf/myshelf.component";
import { PlaceorderComponent } from "./placeorder/placeorder.component";
const arr:Routes=[
  {path:'',component:DemoComponent},
  {path:'bookforsale/:category_id',component:BookforsaleComponent},
  {path:'bookforsaledetail/:book_id',component:BookforsaledetailsComponent},
  {path:'bookforbarter',component:BookforbarterComponent},
  {path:'addbookforbarter',component:AddbookforbarterComponent},
  {path:'bookforbarterdetails/:bookbarter_id',component:BookforbarterdetailsComponent},
  {path:'mycart',component:MycartComponent,canActivate:[AuthguardService]},
  {path:'myshelf',component:MyshelfComponent,canActivate:[AuthguardService]},
  {path:'myaccount',component:MyaccountComponent,canActivate:[AuthguardService]},
  {path:'mybooks',component:MybooksComponent,canActivate:[AuthguardService]},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthguardService]},
  {path:'placeorder',component:PlaceorderComponent,canActivate:[AuthguardService]},
  {path:'login',component:LoginComponent}
];
export const routingarr=RouterModule.forRoot(arr);
