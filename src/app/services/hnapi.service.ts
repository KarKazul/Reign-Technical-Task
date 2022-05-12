import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../interface/news';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, take, tap, withLatestFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HnapiService {
  newsSubject: BehaviorSubject<News[]> = new BehaviorSubject<News[]>([]);
  news$ = this.newsSubject.asObservable();

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
   }

  public getData(contentType: string): void {
    this.news$ = this.newsSubject.asObservable();
    this.http.get<any>(`https://hn.algolia.com/api/v1/search_by_date?query=${contentType}&page=0&hitsPerPage=16`).pipe(
      take(1),
      tap((data) => {
        const news = data.hits;
        this.parseNewsData(news);
      })
    ).subscribe();
  };

  public getDataByPage(contentType: string, pageNum: number): void {
    this.http.get<any>(`https://hn.algolia.com/api/v1/search_by_date?query=${contentType}&page=${pageNum}&hitsPerPage=16`).pipe(
      take(1),
      withLatestFrom(this.news$),
      tap(([data, news]) =>{
        this.parseNewsData([...news, ...data.hits]);
      })
    ).subscribe();
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
