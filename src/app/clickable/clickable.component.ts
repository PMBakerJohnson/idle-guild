import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clickable',
  templateUrl: './clickable.component.html',
  styleUrls: ['./clickable.component.css']
})
export class ClickableComponent implements OnInit {

  someResource = 0;

  generateAGenericResource(): void {
    this.someResource = this.someResource + 1;
  };

  constructor() { }

  ngOnInit() {
  }

}
