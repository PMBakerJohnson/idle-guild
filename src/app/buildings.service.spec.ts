import { TestBed } from '@angular/core/testing';

import { BuildingsService } from './buildings.service';
import { mockTickerService } from './mock-objects/ticker-service';
import { mockGameStateService } from './mock-objects/game-state-service';
import { mockResourceService } from './mock-objects/resource-service';
import * as mockResources from './mock-objects/resources';
import * as mockBuildings from './mock-objects/buildings';
import { TickerService } from './ticker.service';
import { ResourcesService } from './resources.service';
import { GameStateService } from './game-state.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BuildingsService', () => {

     let service: BuildingsService
          , availableBuildings: any[];

     describe('Brand new user', () => {
          beforeEach(() =>
          {
               TestBed.configureTestingModule({
                    providers: [
                         { provide: TickerService, useClass: mockTickerService }
                         , { provide: ResourcesService, useClass: mockResourceService }
                         , { provide: GameStateService, useClass: mockGameStateService }
                    ],
                    schemas: [ NO_ERRORS_SCHEMA ]
               }).compileComponents();
          });

          afterEach(() => {
               service = null;
          });

          it('should generate new building each tick', () => {
               // Test specific setup
               mockTickerService.establishOutputValues([200]);

               // Get a service instance to test, retrieve existing buildings.
               service = TestBed.get(BuildingsService);
               service.availableBuildings$.subscribe(buildings => {
                    availableBuildings = buildings;
               });
               expect(availableBuildings.length).toBeGreaterThan(0);

               // Test specific cleanup
               mockTickerService.establishOutputValues([]);
          });
     })

     describe('Returning user', () => {
          beforeEach(() =>
          {
               TestBed.configureTestingModule({
                    providers: [
                         { provide: TickerService, useClass: mockTickerService }
                         , { provide: ResourcesService, useClass: mockResourceService }
                         , { provide: GameStateService, useClass: mockGameStateService }
                    ],
                    schemas: [ NO_ERRORS_SCHEMA ]
               }).compileComponents();
               mockGameStateService.defaultData = [
                    { key:    'availableBuildings',
                    data:     mockBuildings.testBuildings},
                    { key:    'buildingsOwned',
                    data:     mockBuildings.testOtherBuildings}
               ];

               service = TestBed.get(BuildingsService);
               service.availableBuildings$.subscribe(buildings => {
                    availableBuildings = buildings;
               });
          });

          afterEach(() => {
               service = null;
          });

          it('should be created', () => {
               expect(service).toBeTruthy();
          });

          it('should load default values', () => {
               service.availableBuildings$.subscribe(availableBuildings =>
                    expect(availableBuildings).toEqual(mockBuildings.testBuildings));
               service.buildingsOwned$.subscribe(buildingsOwned =>
                    expect(buildingsOwned).toEqual(mockBuildings.testOtherBuildings));
          });

          it('should purchase building', () => {
               service.availableBuildings$.subscribe(availableBuildings => {
                    let buildingForPurchase = availableBuildings[0];

                    service.purchaseBuilding(buildingForPurchase);

                    expect(availableBuildings.find(building =>
                         buildingForPurchase.name === building.name
                         )).toBeUndefined();
               })
          });
     })
});
