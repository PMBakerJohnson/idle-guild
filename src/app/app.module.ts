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
import { ResourcesService } from './resources.service';
import { BuildingsService } from './buildings.service';
import { AResourceService } from 'src/abstracts/aresource-service';
import { ABuildingService } from 'src/abstracts/abuilding-service';

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
     providers: [
          { provide: AResourceService, useClass: ResourcesService },
          { provide: ABuildingService, useClass: BuildingsService }
     ],
     bootstrap: [AppComponent]
})
export class AppModule { }
