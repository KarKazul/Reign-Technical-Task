import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../interface/news';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, take, tap, pluck, withLatestFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HnapiService {
  newsSubject: BehaviorSubject<News[]> = new BehaviorSubject<News[]>([]);
  news$ = this.newsSubject.asObservable();
  contentType = "angular";

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    this.getData(this.contentType);
   }

  public getData(contentType: string): void {
    this.http.get(`https://hn.algolia.com/api/v1/search_by_date?query=${contentType}&page=0&hitsPerPage=16`).pipe(
      take(1),
      tap((data : any) => {
        const news = data.hits;
        this.parseNewsData(news);
      }) 
    ).subscribe();
  };

  public getDataByPage(contentType: string, pageNum: number): void {
    this.http.get(`https://hn.algolia.com/api/v1/search_by_date?query=${contentType}&page=${pageNum}&hitsPerPage=16`).pipe(
      take(1),
      pluck('hits'),
      withLatestFrom(this.news$),
      tap(([hits, News]) =>{
        console.log(hits, News);
      })
    );
  };

  private parseNewsData (News: News[]): void {
    const currentFavs = this.localStorage.getFavoriteNews();
    const newData = News.map(news =>{
      const found = !!currentFavs.find((fav: News) => fav.created_at === news.created_at);
      return {... news, isFavorite: found};
    });
    this.newsSubject.next(newData);
  }

}
