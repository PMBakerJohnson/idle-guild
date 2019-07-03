import { Observable, from } from 'rxjs';

export class mockTickerService {
     constructor() {
          if(mockTickerService.outputValues !== undefined) { this.tickObservable = from(mockTickerService.outputValues) }
          else { this.tickObservable = new Observable(); }
     }
     static establishOutputValues(outputValues: number[]) {
          this.outputValues = outputValues;
     }
     private static outputValues: number[];
     public tickObservable: Observable<number>;
}
