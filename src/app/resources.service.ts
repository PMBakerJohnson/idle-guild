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

    this.saveService.saveEvent$.subscribe(this.saveSubscriber);
	}
	private resources: Resource[] = RESOURCES;
  // Built the configuration of what happens each tick out separately for ease of viewing.
	private resourcesTicker = {
		next: speedMultiplier => {
			for(let resource of this.resources) {
				resource.accrue(speedMultiplier);
			}
		}
	}
	private startTickerObserver(): void {
		this.tickerService.tickObservable
			.subscribe(this.resourcesTicker);
	}

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

  // Creates a behavior subject. This can be subscribed to and then used to update and maintain resource values throughout the application.
  private resourcesSubject = new BehaviorSubject<Resource[]>(this.resources);
  // This might be unnecessary. It's an observable variant of the resourcesSubject. I'm not sure... what the gain is? On using asObservable?
    // TODO: Research this more. Why SHOULD I use asObservable? Subjects can be subscribed to, just like observables. What's the advantage of this?
  public resourcesSubject$ = this.resourcesSubject.asObservable();
  public updateResources(newResources: any[]) {
    this.resources = [];
    for(let untypedResource of newResources) {
      this.resources.push(new Resource(untypedResource.name, untypedResource.quantity, untypedResource.multiplier, untypedResource.earnings));
    }
    this.resourcesSubject.next(this.resources);
  }

  private saveSubscriber = {
    next: saveDirections => {
      if(saveDirections === 'SAVE') {
        this.saveService.pushSaveData('resource', this.resources);
      } else if(saveDirections === 'LOAD') {
        this.updateResources(this.saveService.pullSavedData('resource'));
      }
    }
  }
}
