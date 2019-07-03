import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingsShopComponent } from '../app/buildings-shop/buildings-shop.component';

describe('BuildingsShopComponent', () => {
     let component: BuildingsShopComponent;
     let fixture: ComponentFixture<BuildingsShopComponent>;

     beforeEach(async(() => {
          TestBed.configureTestingModule({
               declarations: [ BuildingsShopComponent ]
          })
          .compileComponents();
     }));

     beforeEach(() => {
          fixture = TestBed.createComponent(BuildingsShopComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
     });

     it('should create', () => {
          expect(component).toBeTruthy();
     });
});
