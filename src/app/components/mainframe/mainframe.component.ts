import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-mainframe',
  templateUrl: './mainframe.component.html',
  styleUrls: ['./mainframe.component.css']
})


export class MainframeComponent implements OnInit {
  showFirst = true  //flags that that are used to toggle between all the news and the favorite ones.
  showSecond = false

  constructor() { }

  ngOnInit() {
    ;
  }

  toggle():void{
    this.showFirst = true;
    this.showSecond = false;
  }

  toggle1():void{
    this.showFirst = false;
    this.showSecond = true;
  }

}
