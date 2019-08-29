import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedPropertyComponent } from '../app/owned-property/owned-property.component';
import { TestModule } from './test.module';

describe('OwnedPropertyComponent', () => {
     let component: OwnedPropertyComponent;
     let fixture: ComponentFixture<OwnedPropertyComponent>;

     beforeEach(async(() => {
          TestBed.configureTestingModule({
               imports: [ TestModule ],
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
