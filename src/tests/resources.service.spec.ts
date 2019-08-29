import { TestBed } from '@angular/core/testing';
import * as resourceData from './mock-objects/resources';
import { MockTickerService, ExtendedTickerService } from './mock-objects/ticker-service';
import { MockGameStateService } from './mock-objects/game-state-service';

import { ResourcesService } from '../app/resources.service';
import { GameStateService } from '../app/game-state.service';
import { TickerService } from '../app/ticker.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { cloneDeep } from 'lodash';

describe('ResourcesService', () => {

     let service: ResourcesService;

     beforeEach(() => {
          TestBed.configureTestingModule({
               providers: [
                    { provide: TickerService, useClass: MockTickerService },
                    { provide: GameStateService, useClass: MockGameStateService }
               ],
               schemas: [ NO_ERRORS_SCHEMA ]
          }).compileComponents();

          MockGameStateService.defaultData = [{ key: 'resource', data: cloneDeep(resourceData.testResources) }];

          service = TestBed.get(ResourcesService);
     });

     it('should be created', () => {
          expect(service).toBeTruthy();
     });

     it('should get default values', () => {
          service.resourcesSubject$.subscribe(resources => expect(resources).toEqual(resourceData.testResources));
     });

     it('should update resource income', () => {
          service.resourcesSubject$.subscribe(firstPassAtResources => {
               const resourceInitially = firstPassAtResources[0];

               service.updateIncome('An Income Source', 100, resourceInitially.name);

               service.resourcesSubject$.subscribe(secondPassAtResources => {
                    const resourcePostUpdate = secondPassAtResources[0];
                    expect(resourcePostUpdate.perTick - resourceInitially.perTick === 100);
               });
          });
     });

     it('should spend resource', () => {
          service.resourcesSubject$.subscribe(resourcesInitially => {
               const resourceInitially = resourcesInitially.filter(resource => {
                    let returnValue = false;
                    if (resource.quantity > 0) {
                         returnValue = true;
                    }
                    return returnValue;
               })[0];
               service.spend(resourceInitially.quantity, resourceInitially.name);

               service.resourcesSubject$.subscribe(resourcesAfterSpend => {
                    const resourceAfterSpend = resourcesAfterSpend.find(resource => resource.name === resourceInitially.name);
                    expect(resourceAfterSpend.quantity === 0);
               });
          });
     });

     describe('when using save and load', () => {
          let saveTestableService: ResourcesService;
          let tickerService: ExtendedTickerService;
          let gameStateService: MockGameStateService;

          beforeEach(() => {
               MockGameStateService.defaultData = [{ key: 'resource', data: cloneDeep(resourceData.testResources) }];
               gameStateService = new MockGameStateService();
               tickerService = new ExtendedTickerService();

               saveTestableService = new ResourcesService(
                    tickerService,
                    gameStateService);
          });

          it('should save resources', () => {
               spyOn(gameStateService, 'pushSaveData');
               gameStateService.saveData();
               expect(gameStateService.pushSaveData).toHaveBeenCalledWith('resource', resourceData.testResources);
          });
     });
});
