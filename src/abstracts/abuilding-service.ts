import { Building } from 'src/app/objects/building';
import { BehaviorSubject } from 'rxjs';

export abstract class ABuildingService {
     public availableBuildings$: BehaviorSubject<Building[]>;
     public buildingsOwned$: BehaviorSubject<Building[]>;
     public purchaseBuilding: (buildingToBuy: Building) => void;
}
