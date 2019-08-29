import { Component, OnInit } from '@angular/core';

@Component({
     selector: 'app-purchaseables',
     templateUrl: './purchaseables.component.html',
     styleUrls: ['./purchaseables.component.css']
})
export class PurchaseablesComponent implements OnInit {

     public selectedTab: string;

     constructor() { }

     public ngOnInit(): void {
          this.selectedTab = 'buildings';
     }

}
