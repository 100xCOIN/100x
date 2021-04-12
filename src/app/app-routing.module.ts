import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuynowComponent } from './buynow/buynow.component';
import { HowtobuyComponent } from './howtobuy/howtobuy.component';
import { LandingComponent } from './landing/landing.component';
import { WhitePaperComponent } from './white-paper/white-paper.component';

const routes: Routes = [
  {
    path:'', component:LandingComponent
  },
  {
    path:'whitepaper', component:WhitePaperComponent
  },
  {
    path:'swap-now', component:BuynowComponent
  },
  {
    path:'howtobuy', component: HowtobuyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
