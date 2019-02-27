import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TickerService {

  constructor() { }

  // WORTHLESS - This gets passed around a whole lot but doesn't actually accomplish anything. Just like yer mum. OHHHHHH
	speedMultiplier = 1;


	// GAME LOOP - This creates the game clock as an observable things can subscribe to. I probably could have just had
	tickSubscriber = function() {
		// This will keep track of each observer.
		const observers = [];

		// Return the subscriber function? Runs when subscribe() is invoked, purportedly)
		return (observer) => {
			// Adds the observer to the list of them.
			observers.push(observer);
			// If the first subscription, start running.
			if (observers.length === 1) {
				// This runs it. This SHOULD make the whole application run on a one second tick.
				this.initializeLoopingTick({
				  next(val) {
						// Iterate through observers and notify all subscriptions
						observers.forEach(obs => obs.next(val));
				  },
				  complete() {
				  	// Notify all complete callbacks
						observers.slice(0).forEach(obs => obs.complete());
					}
				});
			}
			return {
				unsubscribe() {
					// Remove from the observers array so it's no longer notified
					observers.splice(observers.indexOf(observer), 1);
				}
			};
		};
	}
	initializeLoopingTick = function(observer) {
		window.setInterval(() => {
    	observer.next(this.speedMultiplier);
  	}, 1000);
	}
	tickObservable = new Observable(this.tickSubscriber());
}
