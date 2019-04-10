import { TestBed } from '@angular/core/testing';

import * as testData from './test-data';
import { GameStateService } from './game-state.service';

describe('GameStateService', () => {

     describe('as a new player', () =>
     {

     });

     let service: GameStateService;

     beforeEach(() => {
          TestBed.configureTestingModule({
               providers: [ GameStateService ]
          });

          service = TestBed.get(GameStateService);
          // Game state is handled by an observable. The observable emits a string value
          service.saveEvent$.subscribe(gameStateEvent => {
               switch (gameStateEvent) {
                    case "SAVE":
                         service.pushSaveData('testResources', testData.testResources);
                         break;
                    case "LOAD":
                         service.pullSavedData('testResources');
                         break;
                    default:
                         break;
               };
          });
     });


     it('should be created', () => {
          expect(service).toBeTruthy();
     });

     it('should save data', () => {
          spyOn(window.localStorage, 'setItem').and.callFake(testData.localStorage.prototype.setItem);
          service.saveData();
          expect(window.localStorage.setItem).toHaveBeenCalledWith('saveData',
               // This is just the format saveData ends up taking.
               JSON.stringify( [{ key: 'testResources', data: testData.testResources }] ));
     });

     xit('should load data', () => {
          spyOn(localStorage, 'getItem');

          service.pullSavedData('testData');
     })
});
