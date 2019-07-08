import { TestBed } from '@angular/core/testing';
import { Resource } from 'src/app/objects/resource';


describe('Resource', () => {

  const simpleGoldResource: Resource = new Resource('Gold');
  let silverResource: Resource;

  beforeEach(() => {
    TestBed.configureTestingModule({

    });
    silverResource = new Resource('Silver'
                                , 500
                                , 1
                                , [ {name: 'A source of income' , amount: 10}
                                  , {name: 'Different income'   , amount: 20}]);
  });

  it('should create gold', () => {
    expect(simpleGoldResource).toBeTruthy();
  });

  it('should create silver', () => {
    expect(silverResource).toBeTruthy();
    expect(silverResource.perTick).toEqual(30);
  });

  it('should accrue silver', () => {
    silverResource.accrue(1);
    expect(silverResource.quantity).toEqual(530);
  });

  it('should successfully spend silver', () => {
    const canSpend: boolean = silverResource.spend(40);
    expect(canSpend).toBeTruthy();
    expect(silverResource.quantity).toEqual(460);
    silverResource.quantity = 500;
  });

  it('should add new income', () => {
    silverResource.updateIncome('A New Income Update', 30);
    expect(silverResource.perTick).toEqual(60);
  });

  it('should update existing income', () => {
    silverResource.updateIncome('A source of income', 30);
    expect(silverResource.perTick).toEqual(50);
});
});
