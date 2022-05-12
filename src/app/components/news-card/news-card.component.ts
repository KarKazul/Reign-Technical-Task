import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/interface/news';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsCardComponent implements OnInit {
  @Input() News: any;
  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }

  getIcon(): string{
    return this.News.isFavorite ? 'heart-filled.svg' : 'heart.svg';
  }

  toggleFavorite(): void{
    const isFavorite = this.News.isFavorite;
    this.getIcon();
    this.News.isFavorite = !isFavorite;
    this.localStorage.addOrRemoveFavorite(this.News);
  }

}
