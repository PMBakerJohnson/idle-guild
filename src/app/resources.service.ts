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

          let savedResources = this.saveService.pullSavedData('resource');
          if (savedResources.length !== 0) {
               this.updateResources(savedResources);
          }

          this.saveService.saveEvent$.subscribe(this.saveResourceSubscriber);
     }

     // INTERNAL VARIABLES - Just where I hold the resources dat.
     private resources: Resource[] = RESOURCES;


     // GAME LÖÖP
     // Built the configuration of what happens each tick out separately for ease of viewing, bröther.
     private resourcesTicker = {
          next: (speedMultiplier: number) => {
               for(let resource of this.resources) {
                    resource.accrue(speedMultiplier);
               }
          }
     }
     private startTickerObserver(): void {
          this.tickerService.tickObservable
          .subscribe(this.resourcesTicker);
     }


     // PUBLIC FUNCTIONALITY - Manages the back end of primarily front end interactions. I guess. I don't know how to call things.
     public spend(amountToSpend: number, resourceToSpend: string): boolean {
          let couldSpend: boolean = false;

          // Find returns the first object in an array that matches the required condition.
          couldSpend = this.resources.find(resource => {
               return resource.name == resourceToSpend;
          }).spend(amountToSpend);

          return couldSpend;
     }
     public updateIncome(incomeSource: string, incomeAmount: number, resourceEarned: string) {
          this.resources.find(resource => {
               return resource.name === resourceEarned;
          }).updateIncome(incomeSource, incomeAmount);
     }


     // RESOURCE OBSERVABLE
     // Creates a behavior subject. This can be subscribed to and then used to update and maintain resource values throughout the application.
     public resourcesSubject$ = new BehaviorSubject<Resource[]>(this.resources);
     // This might be unnecessary. It's an observable variant of the resourcesSubject. I'm not sure... what the gain is? On using asObservable?
     // TODO: Research this more. Why SHOULD I use asObservable? Subjects can be subscribed to, just like observables. What's the advantage of this?
     // . . . Successfully tested commenting this out and not using it at all. So.... I'm thinking I'm not using it.
     // public resourcesSubject$ = this.resourcesSubject.asObservable();


     // HELPER FUNCTIONS
     // TODO: Pull the casting bit out of here and into a separate function, so it matches how Buildings does it. And also in case I need to cast under multiple circumstances.
     public updateResources(newResources: any[]) {
          this.resources = [];
          for(let untypedResource of newResources) {
               this.resources.push(new Resource(untypedResource.name, untypedResource.quantity, untypedResource.multiplier, untypedResource.earnings));
          }
          this.resourcesSubject$.next(this.resources);
     }


     // RESOURCE SAVE FUNCTIONALITY
     private saveResourceSubscriber = {
          next: (saveDirections: string) => {
               if(saveDirections === 'SAVE') {
                    this.saveService.pushSaveData('resource', this.resources);
               } else if(saveDirections === 'LOAD') {
                    this.updateResources(this.saveService.pullSavedData('resource'));
               }
          }
     }
}
