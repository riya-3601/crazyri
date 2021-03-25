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
<<<<<<< HEAD
import { OrderComponent } from './order/order.component';
=======
import { PlaceorderComponent } from "./placeorder/placeorder.component";
>>>>>>> 936d3f521539355e36cc3c7cd10225ae1c9d2d67
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
<<<<<<< HEAD
  {path:'myorder',component:OrderComponent,canActivate:[AuthguardService]},
=======
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthguardService]},
  {path:'placeorder',component:PlaceorderComponent,canActivate:[AuthguardService]},
>>>>>>> 936d3f521539355e36cc3c7cd10225ae1c9d2d67
  {path:'login',component:LoginComponent}
];
export const routingarr=RouterModule.forRoot(arr);
