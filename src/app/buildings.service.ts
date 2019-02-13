import { Injectable } from '@angular/core';
import { Building } from './objects/building';
import { Resource } from './objects/resource';
import { ResourcesService } from './resources.service';
import { TickerService } from './ticker.service';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {

  constructor(private tickerService: TickerService) {
	}
}
