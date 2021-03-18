import { Routes,RouterModule } from "@angular/router";
import { AuthguardService } from "./authguard.service";
import { BookforbarterComponent } from "./bookforbarter/bookforbarter.component";
import { BookforbarterdetailsComponent } from "./bookforbarter/bookforbarterdetails/bookforbarterdetails.component";
import { BookforbarterdetailsService } from "./bookforbarterdetails.service";
import { BookforsaleComponent } from './bookforsale/bookforsale.component';
import { BookforsaledetailsComponent } from './bookforsale/bookforsaledetails/bookforsaledetails.component';
import { DemoComponent } from './demo/demo.component';
import { LoginComponent } from "./login/login.component";
import { MycartComponent } from "./mycart/mycart.component";
import { MyshelfComponent } from "./myshelf/myshelf.component";
const arr:Routes=[
  {path:'',component:DemoComponent},
  {path:'bookforsale/:category_id',component:BookforsaleComponent},
  {path:'bookforsaledetail/:book_id',component:BookforsaledetailsComponent,canActivate:[AuthguardService]},
  {path:'bookforbarter',component:BookforbarterComponent},
  {path:'bookforbarterdetails/:bookbarter_id',component:BookforbarterdetailsService},
  {path:'mycart',component:MycartComponent,canActivate:[AuthguardService]},
  {path:'myshelf',component:MyshelfComponent,canActivate:[AuthguardService]},
  {path:'login',component:LoginComponent}
];
export const routingarr=RouterModule.forRoot(arr);
