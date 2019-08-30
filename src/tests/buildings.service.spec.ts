import { TestBed } from '@angular/core/testing';

import { BuildingsService } from '../app/buildings.service';
import { MockTickerService, ExtendedTickerService } from './mock-objects/ticker-service';
import { MockGameStateService } from './mock-objects/game-state-service';
import { MockResourcesService } from './mock-objects/resource-service';
import * as mockBuildings from './mock-objects/buildings';
import { TickerService } from '../app/ticker.service';
import { GameStateService } from '../app/game-state.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as testData from './mock-objects/buildings';
import { TestModule } from './test.module';
import { cloneDeep } from 'lodash';

describe('BuildingsService', () => {

     let service: BuildingsService, availableBuildings: any[];

     const defaultData = [
          { key: 'availableBuildings'
               , data: mockBuildings.testBuildings }
          , { key: 'buildingsOwned'
               , data: mockBuildings.testOtherBuildings }
     ];

     describe('Returning user', () => {
          beforeEach(() => {
               // Sets up the environment in which we'll create the service
               TestBed.configureTestingModule({
                    imports: [ TestModule ],
                    providers: [
                         { provide: TickerService, useClass: MockTickerService }
                         , { provide: GameStateService, useClass: MockGameStateService }
                    ],
                    schemas: [ NO_ERRORS_SCHEMA ]
               }).compileComponents();

               // Establishes defaults for this test suite
               MockGameStateService.defaultData = cloneDeep(defaultData);

               // Gets an instance of the service
               service = TestBed.get(BuildingsService);
          });

          afterEach(() => {
               service = null;
          });

          it('should be created', () => {
               expect(service).toBeTruthy();
          });

          it('should load by default', () => {
               service.availableBuildings$.subscribe(serviceBuildings => {
                    expect(serviceBuildings).toEqual(mockBuildings.testBuildings);
               });
               service.buildingsOwned$.subscribe(buildingsOwned => {
                    expect(buildingsOwned).toEqual(mockBuildings.testOtherBuildings);
               });
          });

          it('should purchase building', () => {
               service.availableBuildings$.subscribe(serviceBuildings => {
                    const buildingForPurchase = serviceBuildings[0];

                    service.purchaseBuilding(buildingForPurchase);

                    expect(serviceBuildings.find(building =>
                         buildingForPurchase.name === building.name
                    )).toBeUndefined();
               });
          });
     });

     describe('Brand new user', () => {
          beforeEach(() => {
               TestBed.configureTestingModule({
                    imports: [ TestModule ],
                    providers: [
                         { provide: TickerService, useClass: MockTickerService }
                         , { provide: GameStateService, useClass: MockGameStateService }
                    ],
                    schemas: [ NO_ERRORS_SCHEMA ]
               }).compileComponents();
          });

          afterEach(() => {
               service = null;
          });

          it('should generate new building each tick', () => {
               // Test specific setup
               MockTickerService.establishOutputValues([200]);

               // Get a service instance to test, retrieve existing buildings.
               service = TestBed.get(BuildingsService);
               service.availableBuildings$.subscribe(buildings => {
                    availableBuildings = buildings;
               });
               expect(availableBuildings.length).toBeGreaterThan(0);
          });
     });

     describe('In the middle of gameplay', () => {
          beforeEach(() => {
               TestBed.configureTestingModule({
                    imports: [ TestModule ],
                    providers: [
                         { provide: TickerService, useClass: MockTickerService }
                         , { provide: GameStateService, useClass: MockGameStateService }
                    ],
                    schemas: [ NO_ERRORS_SCHEMA ]
               }).compileComponents();
          });
     });

     describe('when event triggers are used', () => {
          let tickerService: ExtendedTickerService;
          let resourcesService: MockResourcesService;
          let gameStateService: MockGameStateService;

          let testableBuildingService: BuildingsService;

          beforeEach(() => {
               tickerService = new ExtendedTickerService();
               resourcesService = new MockResourcesService();
               gameStateService = new MockGameStateService();

               MockGameStateService.defaultData = cloneDeep(defaultData);

               testableBuildingService = new BuildingsService(
                    tickerService
                    , resourcesService
                    , gameStateService);
          });

          it('should call save method', () => {
               // Establishes the spy. Apparently it's useful to instantiate the spy.
               const pushDataSpy = spyOn(gameStateService, 'pushSaveData');

               // Trigger the save event.
               gameStateService.saveData();

               // Confirm that the spy received calls as should be expected given the default data for this suite.
               expect(pushDataSpy.calls.argsFor(0)).toEqual(['availableBuildings', testData.testBuildings]);
               expect(pushDataSpy.calls.argsFor(1)).toEqual(['buildingsOwned', testData.testOtherBuildings]);
          });

          it('should call load method', () => {
               // Establish the spy on the load method.
               const pullDataSpy = spyOn(gameStateService, 'pullSavedData');

               // I have to assert before the test to establish that the data actually performs a change.
               testableBuildingService.availableBuildings$.subscribe(buildings => {
                    expect(buildings).toEqual(testData.testBuildings);
               });
               testableBuildingService.buildingsOwned$.subscribe(buildings => {
                    expect(buildings).toEqual(testData.testOtherBuildings);
               });

               // Trigger the save event.
               gameStateService.loadData();

               expect(pullDataSpy.calls.argsFor(0)).toEqual(['availableBuildings']);
               expect(pullDataSpy.calls.argsFor(1)).toEqual(['buildingsOwned']);
          });

     });
});
