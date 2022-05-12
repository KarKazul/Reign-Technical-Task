import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { MainframeComponent } from './components/mainframe/mainframe.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';



@NgModule({
  declarations: [
    AppComponent,
    MainframeComponent,
    NewsCardComponent,
    CardListComponent,
    FavoritesComponent,
    DateAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    CommonModule,
    FormsModule
  ],entryComponents: [CardListComponent, FavoritesComponent],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
