import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SaveControlsComponent } from './save-controls/save-controls.component';
import { ResourceDisplayComponent } from './resource-display/resource-display.component';
import { PurchaseablesComponent } from './purchaseables/purchaseables.component';
import { OwnedPropertyComponent } from './owned-property/owned-property.component';
import { BuildingsShopComponent } from './buildings-shop/buildings-shop.component';
import { PeopleShopComponent } from './people-shop/people-shop.component';

describe('AppComponent', () => {
     beforeEach(async(() => {
          TestBed.configureTestingModule({
               declarations: [
                    AppComponent,
                    SaveControlsComponent,
                    ResourceDisplayComponent,
                    PurchaseablesComponent,
                    OwnedPropertyComponent,
                    BuildingsShopComponent,
                    PeopleShopComponent
               ],
          }).compileComponents();
     }));

     it('should create the app', () => {
          const fixture = TestBed.createComponent(AppComponent);
          const app = fixture.debugElement.componentInstance;
          expect(app).toBeTruthy();
     });

     it(`should have as title 'idle-guild'`, () => {
          const fixture = TestBed.createComponent(AppComponent);
          const app = fixture.debugElement.componentInstance;
          expect(app.title).toEqual('idle-guild');
     });
});
