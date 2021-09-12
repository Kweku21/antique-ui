import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {AppRouting} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRouting,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
