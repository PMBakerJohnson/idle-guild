import { Injectable } from '@angular/core';
import { Resource } from './objects/resource';
import { TickerService } from './ticker.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private tickerService: TickerService) {
		this.establishTicker();
	}

	resources = [new Resource('gold', 500, 1, 1, 1)]

	getResources(): Observable<Resource[]> {
		return of(this.resources);
	}

	// Built the configuration of what happens each tick out separately for ease of viewing.
	resourcesTicker = {
		next: speedMultiplier => {
			for(let resource of this.resources) {
				resource.accrue(speedMultiplier);
			}
		}
	}

	establishTicker(): void {
		this.tickerService.tickObservable
			.subscribe(this.resourcesTicker);
	}

}
