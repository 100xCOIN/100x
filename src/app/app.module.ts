import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { WhitePaperComponent } from './white-paper/white-paper.component';
import { BuynowComponent } from './buynow/buynow.component';
import { HowtobuyComponent } from './howtobuy/howtobuy.component';
import Web3 from 'web3';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    WhitePaperComponent,
    BuynowComponent,
    HowtobuyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,NgHttpLoaderModule.forRoot(),
  ],
  providers: [Web3],
  bootstrap: [AppComponent]
})
export class AppModule { }
