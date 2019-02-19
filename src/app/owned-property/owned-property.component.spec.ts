import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedPropertyComponent } from './owned-property.component';

describe('OwnedPropertyComponent', () => {
  let component: OwnedPropertyComponent;
  let fixture: ComponentFixture<OwnedPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnedPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnedPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
