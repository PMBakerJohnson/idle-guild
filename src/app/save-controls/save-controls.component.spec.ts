import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveControlsComponent } from './save-controls.component';

describe('SaveControlsComponent', () => {
  let component: SaveControlsComponent;
  let fixture: ComponentFixture<SaveControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
