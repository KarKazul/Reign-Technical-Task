import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-mainframe',
  templateUrl: './mainframe.component.html',
  styleUrls: ['./mainframe.component.css']
})


export class MainframeComponent implements OnInit {
  showFirst = true
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
