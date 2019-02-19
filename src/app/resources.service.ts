import { Injectable } from '@angular/core';
import { Resource, RESOURCES } from './objects/resource';
import { TickerService } from './ticker.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private tickerService: TickerService) {
		this.establishTicker();
	}
	resources: Resource[] = RESOURCES;

  // Built the configuration of what happens each tick out separately for ease of viewing.
	resourcesTicker = {
		next: speedMultiplier => {
			for(let resource of this.resources) {
				resource.accrue(speedMultiplier);
			}
			this.getResources();
		}
	}
	establishTicker(): void {
		this.tickerService.tickObservable
			.subscribe(this.resourcesTicker);
	}

	getResources(): Observable<Resource[]> {
		return of(this.resources);
	}

  spend(amountToSpend: number, resourceToSpend: string): boolean {
    let couldSpend: boolean = false;

    // Find returns the first object in an array that matches the required condition.
    couldSpend = this.resources.find(resource => {
      return resource.name == resourceToSpend;
    }).spend(amountToSpend);

    return couldSpend;
  }
  updateIncome(incomeSource: string, incomeAmount: number, resourceEarned: string) {
    this.resources.find(resource => {
      return resource.name === resourceEarned;
    }).updateIncome(incomeSource, incomeAmount);
  }
}
