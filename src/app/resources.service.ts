import { Injectable } from '@angular/core';
import { Resource, RESOURCES } from './objects/resource';
import { TickerService } from './ticker.service';
import { BehaviorSubject } from 'rxjs';
import { GameStateService } from './game-state.service';

@Injectable({
     providedIn: 'root'
})
export class ResourcesService {
     constructor(private tickerService: TickerService, private saveService: GameStateService) {
          this.startTickerObserver();

          const savedResources = this.saveService.pullSavedData('resource');
          if (savedResources.length !== 0) {
               this.updateResources(savedResources);
          }

          this.saveService.saveEvent$.subscribe(this.saveResourceSubscriber);
     }


     // INTERNAL VARIABLES - Just where I hold the resources data.
     private resources: Resource[] = RESOURCES;

     // RESOURCE SAVE FUNCTIONALITY
     private saveResourceSubscriber = {
          next: (saveDirections: string) => {
               if (saveDirections === 'SAVE') {
                    this.saveService.pushSaveData('resource', this.resources);
               } else if (saveDirections === 'LOAD') {
                    this.updateResources(this.saveService.pullSavedData('resource'));
               }
          }
     };

     // GAME LÖÖP
     // Built the configuration of what happens each tick out separately for ease of viewing, bröther.
     private resourcesTicker = {
          next: (speedMultiplier: number) => {
               for (const resource of this.resources) {
                    resource.accrue(speedMultiplier);
               }
          }
     };


     // RESOURCE OBSERVABLE
     // Creates a behavior subject. This can be subscribed to and then used to update and
     // maintain resource values throughout the application.
     public resourcesSubject$ = new BehaviorSubject<Resource[]>(this.resources);


     private startTickerObserver(): void {
          this.tickerService.tickObservable
               .subscribe(this.resourcesTicker);
     }

     // PUBLIC FUNCTIONALITY - Manages the back end of primarily front end interactions. I guess. I don't know how to call things.
     public spend(amountToSpend: number, resourceToSpend: string): boolean {
          let couldSpend = false;

          // Find returns the first object in an array that matches the required condition.
          couldSpend = this.resources.find(resource => {
               return resource.name === resourceToSpend;
          }).spend(amountToSpend);

          return couldSpend;
     }
     public updateIncome(incomeSource: string, incomeAmount: number, resourceEarned: string): void {
          this.resources.find(resource => {
               return resource.name === resourceEarned;
          }).updateIncome(incomeSource, incomeAmount);
     }
     // HELPER FUNCTIONS
     // TODO: Pull the casting bit out of here and into a separate function, so it matches how Buildings does it.
     // And also in case I need to cast under multiple circumstances.
     public updateResources(newResources: any[]): void {
          this.resources = [];
          for (const untypedResource of newResources) {
               this.resources.push(
                    new Resource(untypedResource.name,
                         untypedResource.quantity,
                         untypedResource.multiplier,
                         untypedResource.earnings));
          }
          this.resourcesSubject$.next(this.resources);
     }
}
