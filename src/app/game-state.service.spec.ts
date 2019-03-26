import { TestBed } from '@angular/core/testing';

import { GameStateService } from './game-state.service';

describe('GameStateService', () => {

  let service: GameStateService;
  let data: string[];
  let dataAsJSON: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameStateService]
    });

    service = TestBed.get(GameStateService);
    data = []
  });

  afterEach(() => {
    service = TestBed.get(GameStateService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should save data', () => {
    spyOn(window.localStorage, 'setItem');
    service.pushSaveData('testData', data);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('testData', dataAsJSON);
  });

  xit('should load data', () => {
    spyOn(localStorage, 'getItem');

    service.pullSavedData('testData');
  })
});
