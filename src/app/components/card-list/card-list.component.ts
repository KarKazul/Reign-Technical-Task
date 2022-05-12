import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { News } from 'src/app/interface/news';
import { HnapiService } from 'src/app/services/hnapi.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  DataNews$ = this.appService.news$; // Observable array that is used to give the information to populate the list
  pageNum: number = 1; //Page number used to change the query and get the data
  contentType = "angular"; //String used to change the query between angular, react and vuejs news

  constructor(private appService: HnapiService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.appService.getData(this.contentType); //Get the initial array of news
  }

  onScrollDown(): void {
    this.appService.getDataByPage(this.contentType,this.pageNum); //When we get close to the bottom of the scroll bar we activate this funtion loading and parsing more pages into DataNews$
    this.pageNum++;//we increase the number of the page
  }


  /*When we change the valuo of contenType with the dropdown selector we an event is activated resetting the page number and
 the Array news to later get a new one with the desired topic */

  onChange(contentType: string):void {
    this.pageNum = 1;
    this.appService.news$ = of([])
    this.appService.getData(this.contentType);
  }

}
