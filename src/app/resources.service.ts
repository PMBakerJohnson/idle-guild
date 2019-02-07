import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor() { }

	gold = {
		quantity: 0,
		clickValue: 1,
		multiplier: 1,
		produce: function() {
			this.quantity = this.quantity + (this.clickValue * this.multiplier);
		}, spend: function(amountToSpend: number) {
			this.quantity = this.quantity - amountToSpend;
		}
	}

}
