import { BehaviorSubject } from 'rxjs';
import { Building } from '../../app/objects/building';
import { ABuildingService } from 'src/abstracts/abuilding-service';

export class MockBuildingsService implements ABuildingService {
     availableBuildings$: BehaviorSubject<Building[]>;
     buildingsOwned$: BehaviorSubject<Building[]>;
     purchaseBuilding: (buildingToBuy: Building) => void;
}
