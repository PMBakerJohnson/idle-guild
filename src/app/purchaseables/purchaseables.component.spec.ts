import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseablesComponent } from './purchaseables.component';
import { BuildingsShopComponent } from '../buildings-shop/buildings-shop.component';
import { PeopleShopComponent } from '../people-shop/people-shop.component';

describe('PurchaseablesComponent', () => {
  let component: PurchaseablesComponent;
  let fixture: ComponentFixture<PurchaseablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PurchaseablesComponent,
        BuildingsShopComponent,
        PeopleShopComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
