import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { News } from '../interface/news';

const FAVORITES = 'myFavorites';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private newsFavSubject = new BehaviorSubject<News[]>([]);
  newsFav$ = this.newsFavSubject.asObservable();

  constructor() { 
    this.initialStorage();
  }

  addOrRemoveFavorite(News: News): void{
    const {created_at} = News;
    const currentFavs = this.getFavoriteNews();
    const found = !!currentFavs.find((fav: News) => fav.created_at=== created_at)

    found ? this.removeFromFavorite(created_at) : this.addOrRemoveFavorite(News);
  }

  private addToFavorite(News: News): void{
    try {
      const currentFavs = this.getFavoriteNews();
      localStorage.setItem(FAVORITES, JSON.stringify([...currentFavs, News]));
      this.newsFavSubject.next([...currentFavs,News]);
    } catch (error) {
      console.log('Error saving favorites from localStorage', error);
    }
  };
  
  private removeFromFavorite(created_at: string): void{
    try {
      const currentFavs = this.getFavoriteNews();
      const news = currentFavs.filter((item => item.created_at != created_at));
      localStorage.setItem(FAVORITES, JSON.stringify([...news]));
      this.newsFavSubject.next([...news]);
    } catch (error) {
      console.log('Error deleting favorites from localStorage', error);
    }
  };

  getFavoriteNews(): any{
    try  {
      const newsFav = JSON.parse(localStorage.getItem(FAVORITES)|| '{}' )
      this.newsFavSubject.next(newsFav);
      return newsFav;
    } catch(error){
      console.log('Error getting favorites from localStorage', error);
    }

  }

  private initialStorage(): void{
    const currents = JSON.parse(localStorage.getItem(FAVORITES) || '{}');
    if(!currents){
      localStorage.setItem(FAVORITES, JSON.stringify([]));
    }
    this.getFavoriteNews();
  }
}
