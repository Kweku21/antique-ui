import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {AppRouting} from './app.routing';
import { HeaderComponent } from './components/sections/header/header.component';
import { FooterComponent } from './components/sections/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { DetailsComponent } from './components/details/details.component';
import {FormsModule} from '@angular/forms';
import { CountDownComponent } from './components/count-down/count-down.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DetailsComponent,
    CountDownComponent,
  ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRouting,
        HttpClientModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
