import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class TickerService {

     public tickObservable: Observable<{}>;

     // WORTHLESS - This gets passed around a whole lot but doesn't actually accomplish anything. Just like yer mum. OHHHHHH
     private numberOfDays = 1;

     private intervalAsMilliseconds = 1000;

     // Putting the list of subscribed observers in the service's scope instead
     // of inside a function to be passed around in that scope.
     private subscribedObservers: Observer<number>[] = new Array();

     constructor() {
          this.tickObservable = new Observable(this.tickSubscriber());
     }

     // GAME LOOP - This creates the game clock as an observable things can subscribe to. I probably could have just had
     private tickSubscriber: () => (observer: Observer<any>) => { unsubscribe(): void } = function() {
          // Capture the scope to refer to it reliably; it needs to be captured because "this" isn't a reliable way
          // to refer to it, given that this is a function that returns a function that calls a function with a
          // parameter that has its own scope (or at least, it did during testing)
          const self = this;

          // Return the subscriber function? Runs when subscribe() is invoked
          return function(observer: any): { unsubscribe(): void } {
               // Collects the observer
               self.subscribedObservers.push(observer);
               // If this is the first subscription, this starts the wait() loop that runs the clock.
               // I'm not sure this is a good way to have the idle functionality exist? It works, for now.
               if (self.subscribedObservers.length === 1) {
                    // Starts the function that
                    self.initializeLoopingTick(
                         {
                              next(numberOfDays: number): void {
                                   // Iterate through all observers and emit for them.
                                   self.subscribedObservers.forEach((obs: Observer<number>) => obs.next(numberOfDays));
                              },
                              complete(): void {
                                   // Notify all complete callbacks to
                                   this.subscribedObservers.slice(0).forEach((obs: Observer<number>) => obs.complete());
                              }
                         });
               }
               return {
                    unsubscribe() {
                         // Remove from the observers array so it's no longer notified
                         self.subscribedObservers.splice(self.subscribedObservers.indexOf(observer), 1);
                    }
               };
          };
     };
     private initializeLoopingTick(observer: { next: any; complete?: () => void; }): void {
          window.setInterval(() => {
               observer.next(this.numberOfDays);
          }, this.intervalAsMilliseconds);
     }
}
