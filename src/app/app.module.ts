import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CGOLGridComponent } from './CGOL_grid.component';
import { CGOLControlsComponent } from './CGOL_controls.component';
import { CGOLService } from './CGOL.service';


import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../environments/environment';
 

if (environment.production) {
  enableProdMode();
}   

   
@NgModule({ 
  declarations: [
    AppComponent,
    CGOLGridComponent,
    CGOLControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CGOLService],
  bootstrap: [AppComponent] 
})
export class AppModule { }
   