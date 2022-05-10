import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardListComponent } from './card-list.component';
import { NewsCardModule } from '../news-card/news-card.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardListComponent,
    NewsCardModule,
    InfiniteScrollModule
  ]
})
export class CardListModule { }
