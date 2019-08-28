import { Building } from 'src/app/objects/building';
import { BehaviorSubject } from 'rxjs';

export abstract class ABuildingService {
     availableBuildings$: BehaviorSubject<Building[]>;
     buildingsOwned$: BehaviorSubject<Building[]>;
     purchaseBuilding: (buildingToBuy: Building) => void;
}
