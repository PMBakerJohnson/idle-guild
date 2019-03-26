import { TestBed } from '@angular/core/testing';
import * as testData from './test-data';

import { ResourcesService } from './resources.service';
import { GameStateService } from './game-state.service';

describe('ResourcesService', () => {
     beforeEach(() => TestBed.configureTestingModule({}));

     it('should be created', () => {
          let service: ResourcesService = TestBed.get(ResourcesService);
          expect(service).toBeTruthy();
     });

     it('should get default values', () => {
          spyOn(GameStateService.prototype, 'pullSavedData').and.returnValue(testData.testResourcesJson);
          let service: ResourcesService = TestBed.get(ResourcesService);
          expect(GameStateService.prototype.pullSavedData).toHaveBeenCalled();
          service.resourcesSubject$.subscribe(resources => expect(resources).toEqual(testData.testResources));
     })
});
