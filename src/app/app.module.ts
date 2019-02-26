import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResourceDisplayComponent } from './resource-display/resource-display.component';
import { PurchaseablesComponent } from './purchaseables/purchaseables.component';
import { BuildingsShopComponent } from './buildings-shop/buildings-shop.component';
import { PeopleShopComponent } from './people-shop/people-shop.component';
import { OwnedPropertyComponent } from './owned-property/owned-property.component';
import { SaveControlsComponent } from './save-controls/save-controls.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    ResourceDisplayComponent,
    PurchaseablesComponent,
    BuildingsShopComponent,
    PeopleShopComponent,
    OwnedPropertyComponent,
    SaveControlsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
