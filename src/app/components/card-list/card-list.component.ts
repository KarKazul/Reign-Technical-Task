import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { News } from 'src/app/interface/news';
import { HnapiService } from 'src/app/services/hnapi.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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
  }

  onScrollDown(): void {
    this.appService.getDataByPage(this.contentType, this.pageNum);
    console.log('Down!')
  }

}