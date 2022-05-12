import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private localStorage: LocalStorageService) { }
  newsFav$ = this.localStorage.newsFav$;
  ngOnInit(): void {
  }

}
