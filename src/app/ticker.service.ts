import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class TickerService {

     constructor() { }

     // WORTHLESS - This gets passed around a whole lot but doesn't actually accomplish anything. Just like yer mum. OHHHHHH
     private numberOfDays: number = 1;

     // Putting the list of subscribed observers in the service's scope instead
          // of inside a function to be passed around in that scope.
     private subscribedObservers: Observer<number>[];

     // GAME LOOP - This creates the game clock as an observable things can subscribe to. I probably could have just had
     private tickSubscriber = function() {
          var self = this;

          // Return the subscriber function? Runs when subscribe() is invoked
          return function(observer: any) {
               // Collects the observer
               this.subscribedObservers.push(observer);
               // If this is the first subscription, this starts the wait() loop that runs the clock.
                    // I'm not sure this is a good way to have the idle functionality exist? It works, for now.
               if (this.subscribedObservers.length === 1) {
                    // Starts the function that
                    this.initializeLoopingTick(
                    {
                         next(numberOfDays: number) {
                              // Iterate through all observers and emitk for them.
                              this.subscribedObservers.forEach( (obs: Observer<number>) => obs.next(numberOfDays));
                         },
                         complete() {
                              // Notify all complete callbacks to
                              this.subscribedObservers.slice(0).forEach((obs: Observer<number>) => obs.complete());
                         }
                    });
               }
               return {
                    unsubscribe() {
                         // Remove from the observers array so it's no longer notified
                         this.subscribedObservers.splice(this.subscribedObservers.indexOf(observer), 1);
                    }
               };
          }.bind(self);
     }
     private initializeLoopingTick(observer: { next: any; complete?: () => void; } ): void {
          window.setInterval(() => {
               observer.next(this.numberOfDays);
          }, 1000);
     }
     public tickObservable = new Observable(this.tickSubscriber());
}
