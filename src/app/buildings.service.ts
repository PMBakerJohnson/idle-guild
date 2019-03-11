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

    // Autoload. Gets both of them and saves them into temporary variables for readability, then passes them into the update function.
    let savedAvailableBuildings = this.saveService.pullSavedData('availableBuildings');
    let savedBuildingsOwned = this.saveService.pullSavedData('buildingsOwned');
    if (savedAvailableBuildings.length !== 0 || savedBuildingsOwned.length !== 0) {
      this.updateBuildings(savedAvailableBuildings, savedBuildingsOwned);
    }

    this.saveService.saveEvent$.subscribe(this.saveBuildingSubscriber);

	}


  // INTERNAL VARIABLES - I hate them. daysSinceLastNewBuilding is bad. Bad naming, bad design, bad. And maybe I can condense availableBuildings into an array of two
    // generic objectsthat contains an associated key or something so I know which is which? It just feels silly having them twice everywhere.
  private daysSinceLastNewBuilding = 10;
  private availableBuildings: Building[] = [];
  private buildingsOwned: Building[] = [];


  // DATA MANAGEMENT FUNCTIONS - Kind of helper functions?
  // This is responsible for receiving any type of data, assigning it locally, and then telling the associated observables to emit so that the new data is communicated everywhere.
  private updateBuildings(availableBuildings: any[], buildingsOwned: any[]) {
    this.availableBuildings = this.castJSONToBuilding(availableBuildings);
    this.buildingsOwned = this.castJSONToBuilding(buildingsOwned);

    this.availableBuildingsSubject.next(this.availableBuildings);
    this.buildingsOwnedSubject.next(this.buildingsOwned);
  }
  // This takes a generic (JSON, generally) and converts them into an array of Building objects.
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


  // DATA PERSISTENCE - Probably a bad header. This is where I set up the observables that emit the buildings.
  // Both of the requisite lists as subjects. the BehaviorSubject typing ensures that anything that subscribes to it always automatically gets the last value emitted.
  private availableBuildingsSubject = new BehaviorSubject(this.availableBuildings);
  private buildingsOwnedSubject = new BehaviorSubject(this.buildingsOwned);
  // The subjects as observables. I'm fairly certain you can subscribe to Subjects directly, so it is not clear to me at all why I need this line.
  public availableBuildings$ = this.availableBuildingsSubject.asObservable();
  public buildingsOwned$ = this.buildingsOwnedSubject.asObservable();


  // PUBLIC FUNCTIONALITY: Functions specifically and exclusively for other things to interact with and manipulate the data with.
    // Should house all of the meaningful functionality for buildings, I believe.
  public purchaseBuilding(buildingToBuy: Building): void {
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


  // GAME LOOP
  private generateNewBuilding(): void {
    this.availableBuildings.unshift(new Building());
    if (this.availableBuildings.length > 10) {
      this.availableBuildings.pop();
    }
  }
  private establishTicker(): void {
    this.tickerService.tickObservable
      .subscribe(this.buildingTicker);
  }
  private buildingTicker = {
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


  // SAVE/LOAD
  private saveBuildingSubscriber = {
    next: saveDirections => {
      if(saveDirections === 'SAVE') {
        this.saveService.pushSaveData('availableBuildings', this.availableBuildings);
        this.saveService.pushSaveData('buildingsOwned', this.buildingsOwned);
      } else if(saveDirections === 'LOAD') {
        this.updateBuildings(this.saveService.pullSavedData('availableBuildings'), this.saveService.pullSavedData('buildingsOwned'));
      }
    }
  }

}