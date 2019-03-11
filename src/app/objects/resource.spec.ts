import { TestBed } from '@angular/core/testing';

import { Resource } from './resource';

describe('BuildingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  const simpleGoldResource: Resource = new Resource('Gold');


  it('should create gold', () => {
    expect(simpleGoldResource).toBeTruthy();
  });

  it('should create silver', () => {
    let silverResource = getSilverResource();
    expect(silverResource).toBeTruthy();
    expect(silverResource.perTick).toEqual(30);
  });

  it('should accrue silver', () => {
    let silverResource = getSilverResource();
    silverResource.accrue(1);
    expect(silverResource.quantity).toEqual(530);
  });

  it('should successfully spend silver', () => {
    let silverResource = getSilverResource();
    let canSpend: boolean = silverResource.spend(40)
    expect(canSpend).toBeTruthy();
    expect(silverResource.quantity).toEqual(460);
    silverResource.quantity = 500;
  });

  it('should add new income', () => {
    let silverResource = getSilverResource();
    silverResource.updateIncome('A New Income Update', 30);
    expect(silverResource.perTick).toEqual(60);
  });

  it('should update existing income', () => {
    let silverResource = getSilverResource();
    silverResource.updateIncome('A source of income', 30);
    expect(silverResource.perTick).toEqual(50);
  })
});
function getSilverResource(): Resource {
  let silverResource = new Resource('Silver'
                              , 500
                              , 1
                              , [ {name: 'A source of income' , amount: 10}
                                , {name: 'Different income'   , amount: 20}]);
  return silverResource;
}
