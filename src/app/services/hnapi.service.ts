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
    this.news$ = this.newsSubject.asObservable(); //we set news$ as a observable array of News in case we had to delete it's typing with the "fo" method
    this.http.get<any>(`https://hn.algolia.com/api/v1/search_by_date?query=${contentType}&page=0&hitsPerPage=16`).pipe(  //We get the query data into a any parameter
      take(1),
      tap((data) => {
        const news = data.hits; //we transfer the hits from the query into news and we parse it with the information that we have.
        this.parseNewsData(news);
      })
    ).subscribe();
  };

  public getDataByPage(contentType: string, pageNum: number): void {
    this.http.get<any>(`https://hn.algolia.com/api/v1/search_by_date?query=${contentType}&page=${pageNum}&hitsPerPage=16`).pipe( //We get the query data into a any parameter
      take(1),
      withLatestFrom(this.news$), //We also add the latest array of news that we had so we can merge them and list all of them
      tap(([data, news]) =>{
        this.parseNewsData([...news, ...data.hits]);//We merge them and parse it into the new array
      })
    ).subscribe();
  };

  private parseNewsData (News: News[]): void {
    const currentFavs = this.localStorage.getFavoriteNews(); // We ask for the current favorites in local storage
    const newData = News.map(news =>{ // We map the news array
      const found = !!currentFavs.find((fav: News) => fav.created_at === news.created_at); //We find the matching created_at atributes so we can add the isFavorite boolean into then and know if the new is a favorite or not
      return {... news, isFavorite: found};  //We return the news with the isFavorite boolean into them
    });
    this.newsSubject.next(newData); //We add the data into the behaviour subject Array
  }

}
