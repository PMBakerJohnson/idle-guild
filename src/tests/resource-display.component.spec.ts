import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDisplayComponent } from '../app/resource-display/resource-display.component';

describe('ResourceDisplayComponent', () => {
     let component: ResourceDisplayComponent;
     let fixture: ComponentFixture<ResourceDisplayComponent>;

     beforeEach(async(() => {
          TestBed.configureTestingModule({
               declarations: [ ResourceDisplayComponent ]
          })
          .compileComponents();
     }));

     beforeEach(() => {
          fixture = TestBed.createComponent(ResourceDisplayComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
     });

     it('should create', () => {
          expect(component).toBeTruthy();
     });
});
