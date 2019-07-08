import { BehaviorSubject } from 'rxjs';
import { Building } from '../../app/objects/building';


export class MockBuildingsService {
     constructor(availableBuildings: Building[], buildingsOwned: Building[]) {
          if (availableBuildings !== undefined) {
               this.availableBuildings$ = new BehaviorSubject(availableBuildings);
          } if (buildingsOwned !== undefined) {
               this.buildingsOwned$ = new BehaviorSubject(buildingsOwned);
          }
     }
     public availableBuildings$: BehaviorSubject<Building[]>;
     public buildingsOwned$: BehaviorSubject<Building[]>;
     public purchaseBuildings(): void { }
}
