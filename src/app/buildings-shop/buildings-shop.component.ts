import { Component, OnInit } from '@angular/core';
import { BuildingsService } from '../buildings.service';
import { Building } from '../objects/building';
import { Subscription } from 'rxjs';

@Component({
     selector: 'app-buildings-shop',
     templateUrl: './buildings-shop.component.html',
     styleUrls: ['./buildings-shop.component.css']
})
export class BuildingsShopComponent implements OnInit {
     constructor(private buildingsService: BuildingsService) { }

     buildings: Building[];

     public buildingsSub: Subscription;

     ngOnInit() {
          this.buildingsSub = this.buildingsService.availableBuildings$
          .subscribe(availableBuildings => {
               this.buildings = availableBuildings;
          });
     }

     purchaseBuilding(building: Building): void {
          this.buildingsService.purchaseBuilding(building);
     }
}
