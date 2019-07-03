import { TestBed } from '@angular/core/testing';
import * as resourceData from './mock-objects/resources';
import { mockTickerService } from './mock-objects/ticker-service';
import { mockGameStateService } from './mock-objects/game-state-service';

import { ResourcesService } from '../app/resources.service';
import { GameStateService } from '../app/game-state.service';
import { TickerService } from '../app/ticker.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ResourcesService', () => {

     let service: ResourcesService;

     beforeEach(() => {
          TestBed.configureTestingModule({
               providers: [
                    { provide: TickerService, useClass: mockTickerService },
                    { provide: GameStateService, useClass: mockGameStateService }
               ],
               schemas: [ NO_ERRORS_SCHEMA ]
          }).compileComponents();

          mockGameStateService.defaultData = [{ key: 'resource', data: resourceData.testResources }]

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
               let resourceInitially = firstPassAtResources[0];

               service.updateIncome('An Income Source', 100, resourceInitially.name);

               service.resourcesSubject$.subscribe(secondPassAtResources => {
                    let resourcePostUpdate = secondPassAtResources[0];
                    expect(resourcePostUpdate.perTick - resourceInitially.perTick === 100);
               });
          });
     });

     it('should spend resource', () => {
          service.resourcesSubject$.subscribe(resourcesInitially => {
               let resourceInitially = resourcesInitially.filter(resource => {
                    let returnValue = false;
                    if (resource.quantity > 0) {
                         returnValue = true;
                    }
                    return returnValue;
               })[0];
               service.spend(resourceInitially.quantity, resourceInitially.name);

               service.resourcesSubject$.subscribe(resourcesAfterSpend => {
                    let resourceAfterSpend = resourcesAfterSpend.find(resource => resource.name === resourceInitially.name);
                    expect(resourceAfterSpend.quantity === 0);
               })
          });
     })
});
