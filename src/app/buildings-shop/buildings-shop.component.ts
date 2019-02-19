import { Component, OnInit } from '@angular/core';
import { BuildingsService } from '../buildings.service';
import { Building } from '../objects/building';

@Component({
  selector: 'app-buildings-shop',
  templateUrl: './buildings-shop.component.html',
  styleUrls: ['./buildings-shop.component.css']
})
export class BuildingsShopComponent implements OnInit {

  constructor(private buildingsService: BuildingsService) { }
  ngOnInit() {
    this.getBuildings();
  }

  buildings: Building[];

  getBuildings(): void {
    this.buildingsService.getPurchaseableBuildings()
      .subscribe(
        allBuildings => { this.buildings = allBuildings.availableBuildings });
  }

  purchaseBuilding(building: Building): void {
    this.buildingsService.purchaseBuilding(building);
  }
}
