import { BehaviorSubject } from 'rxjs';
import { Building } from '../objects/building';


export class mockBuildingsService {
     constructor(availableBuildings: Building[] = undefined, buildingsOwned: Building[] = undefined) {
          if(availableBuildings !== undefined) { this.availableBuildings$ = new BehaviorSubject(availableBuildings) };
          if(buildingsOwned !== undefined) { this.buildingsOwned$ = new BehaviorSubject(buildingsOwned) };
     }
     public availableBuildings$: BehaviorSubject<Building[]>;
     public buildingsOwned$: BehaviorSubject<Building[]>;
     public purchaseBuildings(): void {  };
}
