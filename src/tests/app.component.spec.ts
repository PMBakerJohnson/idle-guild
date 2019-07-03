import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { SaveControlsComponent } from '../app/save-controls/save-controls.component';
import { ResourceDisplayComponent } from '../app/resource-display/resource-display.component';
import { PurchaseablesComponent } from '../app/purchaseables/purchaseables.component';
import { OwnedPropertyComponent } from '../app/owned-property/owned-property.component';
import { BuildingsShopComponent } from '../app/buildings-shop/buildings-shop.component';
import { PeopleShopComponent } from '../app/people-shop/people-shop.component';

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
