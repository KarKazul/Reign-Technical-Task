import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardListComponent } from './card-list.component';
import { NewsCardModule } from '../news-card/news-card.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardListComponent,
    NewsCardModule
  ]
})
export class CardListModule { }
