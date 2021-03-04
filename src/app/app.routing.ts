import { Routes,RouterModule } from "@angular/router";
import { BookforbarterComponent } from "./bookforbarter/bookforbarter.component";
import { BookforsaleComponent } from './bookforsale/bookforsale.component';
import { DemoComponent } from './demo/demo.component';
const arr:Routes=[
  {path:'',component:DemoComponent},
  {path:'books/:category_id',component:BookforsaleComponent},
  {path:'bookforbarter',component:BookforbarterComponent}
];
export const routingarr=RouterModule.forRoot(arr);
