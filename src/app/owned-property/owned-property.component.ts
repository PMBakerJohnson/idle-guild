import { Component, OnInit, OnDestroy } from '@angular/core';
import { BuildingsService } from '../buildings.service';
import { Building } from '../objects/building';

@Component({
     selector: 'app-owned-property',
     templateUrl: './owned-property.component.html',
     styleUrls: ['./owned-property.component.css']
})
export class OwnedPropertyComponent implements OnInit, OnDestroy {

     constructor(private buildingsService: BuildingsService) { }

     public buildings: Building[];

     public subscriptionToBuildings = this.buildingsService.buildingsOwned$.subscribe(buildingsOwned => {
          this.buildings = buildingsOwned;
     });

     public ngOnInit() {
     }

     public ngOnDestroy() {
          this.subscriptionToBuildings.unsubscribe();
     }

}
