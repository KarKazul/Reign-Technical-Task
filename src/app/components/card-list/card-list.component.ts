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
  DataNews$ = this.appService.news$;
  pageNum: number = 1;
  contentType = "angular";

  constructor(private appService: HnapiService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.appService.getData(this.contentType);
  }

  onScrollDown(): void {
    this.appService.getDataByPage(this.contentType,this.pageNum);
    this.pageNum++;
  }

  onChange(contentType: string):void {
    this.pageNum = 1;
    this.appService.news$ = of([])
    this.appService.getData(this.contentType);
  }

}
