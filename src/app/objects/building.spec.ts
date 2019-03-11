import { TestBed } from '@angular/core/testing';

import { Building } from './building';

describe('BuildingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  const buildingInstance: Building = new Building();

  const customBuildingInstance: Building = new Building(
          'Guild Hall'
          , 'A Test Building'
          , 500
          , 'gold'
          , 10
          , 'gold');

  it('should create default building', () => {
    expect(buildingInstance).toBeTruthy();
  });

  it('should create custom building', () => {
    expect(customBuildingInstance).toBeTruthy();
  })
});
