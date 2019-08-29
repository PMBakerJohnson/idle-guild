import { Injectable } from '@angular/core';
import { Building } from './objects/building';
import { TickerService } from './ticker.service';
import { BehaviorSubject } from 'rxjs';
import { GameStateService } from './game-state.service';
import { HelperService } from './helper.service';
import { AResourceService } from 'src/abstracts/aresource-service';
import { ABuildingService } from 'src/abstracts/abuilding-service';

@Injectable({
     providedIn: 'root'
})
export class BuildingsService implements ABuildingService {

     // TODO: There need only be one list; purchased or not should be handled with an object property.
     private daysSinceLastNewBuilding = 0;
     private daysBeforeNewBuilding = 10;
     private availableBuildings: Building[] = [];
     private buildingsOwned: Building[] = [];

     constructor(
          private tickerService: TickerService,
          private resourcesService: AResourceService,
          private saveService: GameStateService,
          private helperService: HelperService) {
          // Autoload. Gets both of them and saves them into temporary variables for readability,
          // then passes them into the update function.
          const savedAvailableBuildings = this.saveService.pullSavedData('availableBuildings');
          const savedBuildingsOwned = this.saveService.pullSavedData('buildingsOwned');
          if (savedAvailableBuildings.length !== 0 || savedBuildingsOwned.length !== 0) {
               this.updateBuildings(savedAvailableBuildings, savedBuildingsOwned);
          }

          this.saveService.saveEvent$.subscribe(this.saveBuildingSubscriber);

          this.establishTicker();
     }

     private buildingTicker = {
          next: (daysPerTick: number) => {
               // Every 200 days, and also the very first day,
               if (this.daysSinceLastNewBuilding >= this.daysBeforeNewBuilding) {
                    // Reset the counter
                    this.daysSinceLastNewBuilding -= this.daysBeforeNewBuilding;
                    this.daysSinceLastNewBuilding += daysPerTick;
                    // Generate a new building
                    this.generateNewBuilding();
               } else {
                    this.daysSinceLastNewBuilding++;
               }
          }
     };

     // SAVE/LOAD
     private saveBuildingSubscriber = {
          next: (saveDirections: string) => {
               if (saveDirections === 'SAVE') {
                    this.saveService.pushSaveData('availableBuildings', this.availableBuildings);
                    this.saveService.pushSaveData('buildingsOwned', this.buildingsOwned);
               } else if (saveDirections === 'LOAD') {
                    this.updateBuildings(
                         this.saveService.pullSavedData('availableBuildings')
                         , this.saveService.pullSavedData('buildingsOwned')
                    );
               }
          }
     };

     // DATA PERSISTENCE - Probably a bad header. This is where I set up the observables that emit the buildings.
     // Both of the requisite lists as BehaviorSubjects; that specific typing means subscriptions automatically get the most
     // recent value emitted when they first subscribe.
     public availableBuildings$ = new BehaviorSubject(this.availableBuildings);
     public buildingsOwned$ = new BehaviorSubject(this.buildingsOwned);

     // DATA MANAGEMENT FUNCTIONS - Kind of helper functions?
     // Primarily for receiving from JSON; should just build an explicit cast into data objects.
     private updateBuildings(availableBuildings: any[] = [], buildingsOwned: any[] = []): void {
          for (const building of availableBuildings) {
               this.availableBuildings.push(this.helperService.fromJSON(new Building(), building));
          }
          for (const building of buildingsOwned) {
               this.buildingsOwned.push(this.helperService.fromJSON(new Building(), building));
          }
          this.availableBuildings$.next(this.availableBuildings);
          this.buildingsOwned$.next(this.buildingsOwned);
     }

     // GAME LOOP
     private establishTicker(): void {
          this.tickerService.tickObservable
               .subscribe(this.buildingTicker);
     }
     private generateNewBuilding(): void {
          this.availableBuildings.unshift(new Building());
          if (this.availableBuildings.length > 10) {
               this.availableBuildings.pop();
          }
     }


     // PUBLIC FUNCTIONALITY: Functions specifically and exclusively for other things to interact with and manipulate the data with.
     // Should house all of the meaningful functionality for buildings, I believe.
     // Side note: depressing.
     public purchaseBuilding(buildingToBuy: Building): void {
          const couldAfford: boolean = this.resourcesService.spend(buildingToBuy.cost, buildingToBuy.purchaseWith);
          if (couldAfford === true) {
               this.buildingsOwned.push(this.availableBuildings.find(building => building.name === buildingToBuy.name));
               this.availableBuildings.forEach((building, index) => {
                    if (building.name === buildingToBuy.name) {
                         this.availableBuildings.splice(index, 1);
                    }
               });
               this.resourcesService.updateIncome(buildingToBuy.name, buildingToBuy.production, buildingToBuy.productionType);
          }
     }
}
