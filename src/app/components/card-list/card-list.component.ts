import { Component, OnInit } from '@angular/core';
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
  obsArray: BehaviorSubject<News[]> = new BehaviorSubject<News[]>([]);
  DataNews$: Observable<any> = this.obsArray.asObservable();
  public contentType = "angular";
  pageNum: number = 0;

  constructor(private appService: HnapiService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.getData();
  }

  
  private getData() {
    this.appService.getData(this.contentType).subscribe((data: any) => {
      this.obsArray.next(data.hits);
    });
  }

  private getDataByPage(){
    this.appService.getDataByPage(this.contentType,this.pageNum).subscribe((data: any) => {
      this.obsArray.next(data.hits);
    })
  }

  onScrollDown(): void{
    this.getDataByPage();
  }
}
