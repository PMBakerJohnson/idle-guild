import { Component, OnInit } from '@angular/core';

@Component({
     selector: 'app-purchaseables',
     templateUrl: './purchaseables.component.html',
     styleUrls: ['./purchaseables.component.css']
})
export class PurchaseablesComponent implements OnInit {

     selectedTab: string;

     constructor() { }

     public ngOnInit() {
          this.selectedTab = 'buildings';
     }

}
