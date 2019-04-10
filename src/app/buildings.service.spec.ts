import { TestBed } from '@angular/core/testing';

import { BuildingsService } from './buildings.service';
import * as testData from './test-data';
import { mockTickerService } from './mock-objects/ticker-service';
import { mockGameStateService } from './mock-objects/game-state-service';
import { mockResourceService } from './mock-objects/resource-service';
import { TickerService } from './ticker.service';
import { ResourcesService } from './resources.service';
import { GameStateService } from './game-state.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BuildingsService', () => {

     let service: BuildingsService
          , availableBuildings: any[];

     describe('Brand new service', () => {
          beforeEach(() =>
          {
               TestBed.configureTestingModule({
                    providers: [
                         { provide: TickerService, useClass: mockTickerService }
                         , { provide: ResourcesService, useClass: testData.mockResourceService }
                         , { provide: GameStateService, useClass: testData.mockGameStateService }
                    ],
                    schemas: [ NO_ERRORS_SCHEMA ]
               }).compileComponents();
               mockTickerService.establishOutputValues([200]);
               service = TestBed.get(BuildingsService);
               service.availableBuildings$.subscribe(buildings => {
                    availableBuildings = buildings;
               });
          });

          afterEach(() => {
               service = null;
               mockTickerService.establishOutputValues([]);
          });

          it('should generate new building each tick', () => {
               expect(availableBuildings.length).toBeGreaterThan(0);
          });
     })

     describe('Service with data', () => {
          beforeEach(() =>
          {
               TestBed.configureTestingModule({
                    providers: [
                         { provide: TickerService, useClass: mockTickerService }
                         , { provide: ResourcesService, useClass: testData.mockResourceService }
                         , { provide: GameStateService, useClass: testData.mockGameStateService }
                    ],
                    schemas: [ NO_ERRORS_SCHEMA ]
               }).compileComponents();
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
               service.availableBuildings$.subscribe(availableBuildings => expect(availableBuildings).toEqual(testData.testBuildings));
               service.buildingsOwned$.subscribe(buildingsOwned => expect(buildingsOwned).toEqual(testData.testOtherBuildings));
          });

          it('should purchase building', () => {
               service.availableBuildings$.subscribe(availableBuildings => {
                    let buildingForPurchase = availableBuildings[0];

                    service.purchaseBuilding(buildingForPurchase);

                    expect(availableBuildings.find(remainingBuilding => buildingForPurchase.name === remainingBuilding.name)).toBeUndefined();
               })
          });
     })
});
