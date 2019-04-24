import { Resource } from './objects/resource';
import { Building } from './objects/building';
import { BehaviorSubject, Subject, of } from 'rxjs';

export let copper: Resource = new Resource(
     'Copper'
     , 50
     , 1
     , [ { name: 'A source of income' , amount: 1}
     , { name: 'A different source of income', amount: 2}]
);
export let silver: Resource = new Resource(
     'Silver'
     , 500
     , 1
     , [ { name: 'A source of income'   , amount: 10}
     , { name: 'Different income'       , amount: 20}]
);
export let gold: Resource = new Resource('Gold');

export var testResources: Resource[] = [copper, silver, gold];
export var testResourcesJson: any[] = [
     {
          'earnings':
          [{
               'name':        'A source of income'
               , 'amount':    1
          }, {
               'name':        'A different source of income'
               , 'amount':    2
          }]
          , 'name':    'Copper'
          , 'quantity':  50
          , 'multiplier':1
          , 'perTick':   3
     }, {
          'earnings':
          [{
               'name':        'A source of income'
               , 'amount':    10
          }, {
               'name':        'Different income'
               , 'amount':    20
          }]
          , 'name':      'Silver'
          , 'quantity':  500
          , 'multiplier':1
          , 'perTick':   30
     }, {
          'earnings':    []
          , 'name':      'Gold'
          , 'quantity':  0
          , 'multiplier':1
          , 'perTick':   0
     }
];

export let theLocalPub:  Building = new Building('Pub',          'Local Pub',        300, 'Gold',   10,  'Gold');
export let theTownHall:  Building = new Building('Longhouse',    'Town Hall',        500, 'Gold',   -3,  'Gold');
export let aNiceHouse:   Building = new Building('House',        'Nice Cottage',     100, 'Silver', -1,  'Silver');
export let theWash:      Building = new Building('Utility',      'The wash',         20,  'Copper', 0,   'Copper');

export let testBuildings: Building[] = [theLocalPub, theTownHall, aNiceHouse, theWash];
export let testBuildingsJson: any[] = [
     {
          'name':             'Local Pub'
          , 'type':           'Pub'
          , 'cost':           300
          , 'purchaseWith':   'Gold'
          , 'production':     10
          , 'productionType': 'Gold'
     }, {
          'name':             'Town Hall'
          , 'type':           'Longhouse'
          , 'cost':           500
          , 'purchaseWith':   'Gold'
          , 'production':     -3
          , 'productionType': 'Gold'
     }, {
          'name':             'Nice Cottage'
          , 'type':           'House'
          , 'cost':           100
          , 'purchaseWith':   'Silver'
          , 'production':     -1
          , 'productionType': 'Silver'
     }, {
          'name':             'The wash'
          , 'type':           'Utility'
          , 'cost':           20
          , 'purchaseWith':   'Copper'
          , 'production':     0
          , 'productionType': 'Copper'
     }
];


export let theLocalBar:  Building = new Building('Bar',          'A Local Bar',      300, 'Gold',   10,  'Gold');
export let theMageGuild: Building = new Building('Guild Hall',   'The Mage Guild',   500, 'Gold',   2,   'Silver');
export let aShabbyCabin: Building = new Building('House',        'A Shabby Cabin',   100, 'Silver', -1,  'Silver');
export let anOuthouse:   Building = new Building('Utility',      'An Outhouse',      20,  'Copper', 0,   'Copper');

export let testOtherBuildings: Building[] = [theLocalBar, theMageGuild, aShabbyCabin, anOuthouse];
export let testOtherBuildingsJson: any[] = [
     {
          'name':             'A Local Bar'
          , 'type':           'Bar'
          , 'cost':           300
          , 'purchaseWith':   'Gold'
          , 'production':     10
          , 'productionType': 'Gold'
     }, {
          'name':             'The Mage Guild'
          , 'type':           'Guild Hall'
          , 'cost':           500
          , 'purchaseWith':   'Gold'
          , 'production':     2
          , 'productionType': 'Silver'
     }, {
          'name':             'A Shabby Cabin'
          , 'type':           'House'
          , 'cost':           100
          , 'purchaseWith':   'Silver'
          , 'production':     -1
          , 'productionType': 'Silver'
     }, {
          'name':             'An Outhouse'
          , 'type':           'Utility'
          , 'cost':           20
          , 'purchaseWith':   'Copper'
          , 'production':     0
          , 'productionType': 'Copper'
     }
]

export function mockPullSavedData(selectedDataKey: string): any[] {
     let mockSavedData = [];
     switch (selectedDataKey) {
          case 'resource':
               mockSavedData = testResourcesJson;
               break;
          case 'availableBuildings':
               mockSavedData = testBuildingsJson;
               break;
          case 'buildingsOwned':
               mockSavedData = testOtherBuildingsJson;
               break;
          default:
               break;
     }
     return mockSavedData;
}

export class mockBuildingsService {
     public availableBuildings$: BehaviorSubject<Building[]> = new BehaviorSubject(testBuildings);
     public buildingsOwned$: BehaviorSubject<Building[]> = new BehaviorSubject(testOtherBuildings);
     public purchaseBuildings(): void {  };
}
export class mockResourceService {
     public spend(): boolean { return true; }
     public updateIncome(): void {}
     public resources$: BehaviorSubject<Resource[]> = new BehaviorSubject(testResources);
     public updateResources(): void { }
}
export class mockTickerService {
     public tickObservable = of(10, 10, 10);
}
export class mockGameStateService {
     public pushSaveData(): void {};
     public pullSavedData(selectedDataKey: string): any[] {
          let mockSavedData = [];
          switch (selectedDataKey) {
               case 'resource':
                    mockSavedData = testResourcesJson;
                    break;
               case 'availableBuildings':
                    mockSavedData = testBuildingsJson;
                    break;
               case 'buildingsOwned':
                    mockSavedData = testOtherBuildingsJson;
                    break;
               default:
                    break;
          }
          return mockSavedData;
     }
     public saveData(): void {};
     public loadData(): void {};
     public resetData(): void {};
     public saveEvent$ = new Subject<string>();
}

export class localStorage {
     public setItem(): any { return undefined };
     public getItem(selectedDataKey: string): any[] {
          let mockedSaveData: any[];

          switch (selectedDataKey) {
               case "resource":
                    mockedSaveData = testResourcesJson;
                    break;
               case "availableBuildings":
                    mockedSaveData = testBuildingsJson;
                    break;
               case "buildingsOwned":
                    mockedSaveData = testOtherBuildingsJson;
                    break;
               default:
                    mockedSaveData = null;
                    break;
          }

          return mockedSaveData;
     }
}
