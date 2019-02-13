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

	resources = RESOURCES;

	getResources(): Observable<Resource[]> {
		return of(this.resources);
	}

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

}
