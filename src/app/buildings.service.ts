import { Injectable } from '@angular/core';
import { Building } from './objects/building';
import { Resource } from './objects/resource';
import { ResourcesService } from './resources.service';
import { TickerService } from './ticker.service';
import { BehaviorSubject } from 'rxjs';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {
  constructor(private tickerService: TickerService
      , private resourcesService: ResourcesService
      , private saveService: GameStateService) {
    this.establishTicker();

    let savedAvailableBuildings = this.saveService.pullSavedData('availableBuildings');
    let savedBuildingsOwned = this.saveService.pullSavedData('buildingsOwned');

    if (savedAvailableBuildings.length !== 0 || savedBuildingsOwned.length !== 0) {
      this.updateBuildings(savedAvailableBuildings, savedBuildingsOwned);
    }

    this.saveService.saveEvent$.subscribe(this.buildingSubscriber);

	}
  // Variables!
  private daysSinceLastNewBuilding = 10;
  private availableBuildings: Building[] = [];
  private buildingsOwned: Building[] = [];
  private buildingSubscriber = {
    next: saveDirections => {
      if(saveDirections === 'SAVE') {
        this.saveService.pushSaveData('availableBuildings', this.availableBuildings);
        this.saveService.pushSaveData('buildingsOwned', this.buildingsOwned);
      } else if(saveDirections === 'LOAD') {
        this.updateBuildings(this.saveService.pullSavedData('availableBuildings'), this.saveService.pullSavedData('buildingsOwned'));
      }
    }
  }

  private updateBuildings(availableBuildings: any[], buildingsOwned: any[]) {
    this.availableBuildings = this.castJSONToBuilding(availableBuildings);
    this.buildingsOwned = this.castJSONToBuilding(buildingsOwned);

    this.availableBuildingsSubject.next(this.availableBuildings);
    this.buildingsOwnedSubject.next(this.buildingsOwned);
  }
  private castJSONToBuilding(jsonValues: any[]): Building[] {
    let jsonAsBuildings: Building[] = []
    for(let buildingAsJson of jsonValues) {
      jsonAsBuildings.push(
        new Building(
          buildingAsJson.type
          , buildingAsJson.name
          , buildingAsJson.cost
          , buildingAsJson.purchaseWith
          , buildingAsJson.production
          , buildingAsJson.productionType));
    }
    return jsonAsBuildings;
  }

  // Currently, the basic game loop for buildings!
  generateNewBuilding(): void {
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
      if (this.daysSinceLastNewBuilding >= 10) {
        // Reset the counter
        this.daysSinceLastNewBuilding -= 10;
        this.daysSinceLastNewBuilding += daysPerTick;
        // Generate a new building
        this.generateNewBuilding();
      } else {
        this.daysSinceLastNewBuilding++;
      }
    }
  }

  public availableBuildingsSubject = new BehaviorSubject(this.availableBuildings);
  public buildingsOwnedSubject = new BehaviorSubject(this.buildingsOwned);
  public availableBuildings$ = this.availableBuildingsSubject.asObservable();
  public buildingsOwned$ = this.buildingsOwnedSubject.asObservable();
  purchaseBuilding(buildingToBuy: Building): void {
    let couldAfford: boolean = this.resourcesService.spend(buildingToBuy.cost, buildingToBuy.purchaseWith);
    if (couldAfford === true) {
      this.buildingsOwned.push(this.availableBuildings.find(building => { return building.name === buildingToBuy.name }));
      this.availableBuildings.forEach((building, index) => {
        if (building.name === buildingToBuy.name) {
          this.availableBuildings.splice(index, 1);
        }
      });
      this.resourcesService.updateIncome(buildingToBuy.name, buildingToBuy.production, buildingToBuy.productionType);
    }
  }
}
