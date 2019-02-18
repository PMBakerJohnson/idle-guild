import { Injectable } from '@angular/core';
import { Building } from './objects/building';
import { Resource } from './objects/resource';
import { ResourcesService } from './resources.service';
import { TickerService } from './ticker.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {
  constructor(private tickerService: TickerService
      , private resourcesService: ResourcesService) {
    this.establishTicker();
	}
  // Variables!
  daysSinceLastNewBuilding = 20;
  availableBuildings: Building[] = [];
  buildingsOwned: Building[] = [];

  // Currently, the basic game loop for buildings!
  generateNewBuilding() {
    this.availableBuildings.unshift(new Building());
    if (this.availableBuildings.length > 10) {
      this.availableBuildings.pop();
    }
  }
  establishTicker(): void {
    this.tickerService.tickObservable
      .subscribe(this.buildingTicker);
  }
  buildingTicker = {
    next: daysPerTick => {
      // Every 200 days, and also the very first day,
      if (this.daysSinceLastNewBuilding >= 20) {
        // Reset the counter
        this.daysSinceLastNewBuilding -= 20;
        this.daysSinceLastNewBuilding += daysPerTick;
        // Generate a new building
        this.generateNewBuilding();
      } else {
        this.daysSinceLastNewBuilding++;
      }
    }
  }

  // Functions for public consumption!
  getPurchaseableBuildings(): Observable<Building[]> {
    return of(this.availableBuildings);
  }

  purchaseBuilding(buildingToBuy: Building): void {
    let couldAfford: boolean = this.resourcesService.spend(buildingToBuy.cost, buildingToBuy.purchaseWith);
    if (couldAfford === true) {
      this.buildingsOwned.push(this.availableBuildings.find(building => { return building.name === buildingToBuy.name }))
      this.availableBuildings = this.availableBuildings.filter(building => {
        return building.name !== buildingToBuy.name;
      })
    }
  }

}
