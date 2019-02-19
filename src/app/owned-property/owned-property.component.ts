import { Component, OnInit } from '@angular/core';
import { BuildingsService } from '../buildings.service';
import { Building } from '../objects/building';

@Component({
  selector: 'app-owned-property',
  templateUrl: './owned-property.component.html',
  styleUrls: ['./owned-property.component.css']
})
export class OwnedPropertyComponent implements OnInit {

  constructor(private buildingsService: BuildingsService) { }
  ngOnInit() {
    this.getBuildings();
  }

  buildings: Building[];
  testBuildings: Building[];

  getBuildings(): void {
    this.buildingsService.getPurchaseableBuildings()
      .subscribe(
        allBuildings => { this.buildings = allBuildings.buildingsOwned }
      );
  }

}
