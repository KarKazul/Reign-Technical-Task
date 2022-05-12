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
    this.initialStorage(); // We initate the Storage in case the are no previous Favorites
  }

  addOrRemoveFavorite(News: News): void{
    const {created_at} = News; // Deconstructing News so we get the created_at value from it
    const currentFavs = this.getFavoriteNews(); //We get the current favorite news from local storage
    const found = !!currentFavs.find((fav: News) => fav.created_at === created_at); //we search for matching news if we find one we get a "false" boolean if we don't we get "true"
    found ? this.removeFromFavorite(created_at) : this.addToFavorite(News);//Once a matching new is found we use the boolean we got to decide which method to call
  }

  private addToFavorite(News: News): void{
    try {
      const currentFavs = this.getFavoriteNews(); //We get the current favorite news from local storage
      localStorage.setItem(FAVORITES, JSON.stringify([...currentFavs, News])); //Adds the favorite new into local storage
      this.newsFavSubject.next([...currentFavs,News]);//Adds this new into the favorite news array
    } catch (error) {
      console.log('Error saving favorites from localStorage', error);
    }
  };

  private removeFromFavorite(created_at: string): void{
    try {
      const currentFavs = this.getFavoriteNews();// Gets the current favorite news from local storage
      const news = currentFavs.filter((item => item.created_at != created_at)); //Returns an array with every other favorite but the one that matches
      localStorage.setItem(FAVORITES, JSON.stringify([...news]));//Sets the new array into local storage
      this.newsFavSubject.next([...news]);// Sets the favorite news array with the new array
    } catch (error) {
      console.log('Error deleting favorites from localStorage', error);
    }
  };

  getFavoriteNews(): any{
    try  {
      const newsFav = JSON.parse(localStorage.getItem(FAVORITES)|| '{}' ) // Gets the current favorite news from local storage
      this.newsFavSubject.next(newsFav);//Sets the new array into the array of favorite news
      return newsFav;//Returns the favorite news array of behaviorSubject
    } catch(error){
      console.log('Error getting favorites from localStorage', error);
    }

  }

  initialStorage(): void{
    const current = JSON.parse(localStorage.getItem(FAVORITES) || '{}'); // Tries to parse the local storage favorites
    if(!current){
      localStorage.setItem(FAVORITES, JSON.stringify([]));// In case there's none it initalized the local storage with a null key
    }
    this.getFavoriteNews();//Gets the favorite news in case there is from previous instances
  }
}
