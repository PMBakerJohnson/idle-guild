import { Component, OnInit } from '@angular/core';

@Component({
     selector: 'app-purchaseables',
     templateUrl: './purchaseables.component.html',
     styleUrls: ['./purchaseables.component.css']
})
export class PurchaseablesComponent implements OnInit {

     constructor() { }

     ngOnInit() {
          this.selectedTab = 'buildings'
     }

     selectedTab: string;

}
