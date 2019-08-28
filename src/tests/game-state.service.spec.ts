import { TestBed } from '@angular/core/testing';

import * as testData from '../app/test-data';
import { localStorage } from './mock-objects/local-storage';
import { GameStateService } from '../app/game-state.service';

describe('GameStateService', () => {

     let service: GameStateService;

     beforeEach(() => {
          TestBed.configureTestingModule({
               providers: [ GameStateService ]
          });

          service = TestBed.get(GameStateService);
          // Game state is handled by an observable. The observable emits a string value
          service.saveEvent$.subscribe(gameStateEvent => {
               switch (gameStateEvent) {
                    case 'SAVE':
                         service.pushSaveData('testResources', testData.testResources);
                         break;
                    case 'LOAD':
                         service.pullSavedData('testResources');
                         break;
                    default:
                         break;
               }
          });
     });

     it('should be created', () => {
          expect(service).toBeTruthy();
     });

     it('should save data', () => {
          spyOn(window.localStorage, 'setItem');
          service.saveData();
          expect(window.localStorage.setItem).toHaveBeenCalledWith('saveData',
               // This is just the format saveData ends up taking.
               JSON.stringify( [{ key: 'testResources', data: testData.testResources }] ));
     });

     it('should load data', () => {
          spyOn(window.localStorage, 'getItem').and.callFake(localStorage.prototype.getItem);

          service.pullSavedData('testData');
     });
});
