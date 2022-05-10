import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../interface/news';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HnapiService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  public getData(contentType: string) {
    return this.http.get(`https://hn.algolia.com/api/v1/search_by_date?query=${contentType}&page=0&hitsPerPage=8`);
  };

  public getDataByPage(contentType: string, pageNum: number) {
    return this.http.get(`https://hn.algolia.com/api/v1/search_by_date?query=${contentType}&page=${pageNum}&hitsPerPage=8`);
  };
}
