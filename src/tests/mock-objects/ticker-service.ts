import { Observable, from } from 'rxjs';
import { TickerService } from 'src/app/ticker.service';

export class MockTickerService {
     constructor() {
          if (MockTickerService.outputValues !== undefined) {
               this.tickObservable = from(MockTickerService.outputValues);
          } else {
               this.tickObservable = new Observable();
          }
     }
     private static outputValues: number[];
     public tickObservable: Observable<number>;
     static establishOutputValues(outputValues: number[]) {
          this.outputValues = outputValues;
     }
}

export class ExtendedTickerService extends TickerService {
     constructor() {
          super();
          if (ExtendedTickerService.outputValues !== undefined) {
               this.tickObservable = from(ExtendedTickerService.outputValues);
          } else {
               this.tickObservable = new Observable();
          }
     }
     private static outputValues: number[];
     public tickObservable: Observable<number>;
     static establishOutputValues(outputValues: number[]) {
          this.outputValues = outputValues;
     }
}
