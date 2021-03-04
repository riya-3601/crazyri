import { Routes,RouterModule } from "@angular/router";
import { BookforsaleComponent } from './bookforsale/bookforsale.component';
import { BookforsaledetailsComponent } from './bookforsale/bookforsaledetails/bookforsaledetails.component';
import { DemoComponent } from './demo/demo.component';
const arr:Routes=[
  {path:'',component:DemoComponent},
  {path:'books/:category_id',component:BookforsaleComponent},
  {path:'bookdetail/:book_id',component:BookforsaledetailsComponent},
];
export const routingarr=RouterModule.forRoot(arr);
