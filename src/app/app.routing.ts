import { Routes,RouterModule } from "@angular/router";
import { BookforbarterComponent } from "./bookforbarter/bookforbarter.component";
import { BookforbarterdetailsComponent } from "./bookforbarter/bookforbarterdetails/bookforbarterdetails.component";
import { BookforsaleComponent } from './bookforsale/bookforsale.component';
import { BookforsaledetailsComponent } from './bookforsale/bookforsaledetails/bookforsaledetails.component';
import { DemoComponent } from './demo/demo.component';
import { LoginComponent } from "./login/login.component";
const arr:Routes=[
  {path:'',component:DemoComponent},
  {path:'bookforsale/:category_id',component:BookforsaleComponent},
  {path:'bookforsaledetail/:book_id',component:BookforsaledetailsComponent},
  {path:'bookforbarter',component:BookforbarterComponent},
  {path:'bookforbarterdetails/:bookbarter_id',component:BookforbarterdetailsComponent},
  {path:'login',component:LoginComponent}
];
export const routingarr=RouterModule.forRoot(arr);
