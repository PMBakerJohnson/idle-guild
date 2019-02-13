import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleShopComponent } from './people-shop.component';

describe('PeopleShopComponent', () => {
  let component: PeopleShopComponent;
  let fixture: ComponentFixture<PeopleShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
