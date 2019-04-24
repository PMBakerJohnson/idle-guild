import { TestBed } from '@angular/core/testing';

import { Building } from './building';

describe('Build', () => {

  let buildingInstance: Building = new Building();

  let customBuildingInstance: Building;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    customBuildingInstance = new Building(
            'Guild Hall'
            , 'A Test Building'
            , 500
            , 'gold'
            , 10
            , 'gold');
  });

  it('should create default building', () => {
    expect(buildingInstance).toBeTruthy();
  });

  it('should create custom building', () => {
    expect(customBuildingInstance).toBeTruthy();
  })
});
