import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClickableComponent } from './clickable/clickable.component';
import { ResourceDisplayComponent } from './resource-display/resource-display.component';
import { PurchaseablesComponent } from './purchaseables/purchaseables.component';
import { BuildingsShopComponent } from './buildings-shop/buildings-shop.component';
import { PeopleShopComponent } from './people-shop/people-shop.component';
import { OwnedPropertyComponent } from './owned-property/owned-property.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickableComponent,
    ResourceDisplayComponent,
    PurchaseablesComponent,
    BuildingsShopComponent,
    PeopleShopComponent,
    OwnedPropertyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
