import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { MainframeComponent } from './components/mainframe/mainframe.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { CardListComponent } from './components/card-list/card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainframeComponent,
    NewsCardComponent,
    CardListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
