import { Component, OnInit, OnDestroy } from '@angular/core';
import { BuildingsService } from '../buildings.service';
import { Building } from '../objects/building';
import { Subscription } from 'rxjs';

@Component({
     selector: 'app-owned-property',
     templateUrl: './owned-property.component.html',
     styleUrls: ['./owned-property.component.css']
})
export class OwnedPropertyComponent implements OnInit, OnDestroy {

     public buildings: Building[];

     public subscriptionToBuildings: Subscription = this.buildingsService.buildingsOwned$.subscribe(buildingsOwned => {
          this.buildings = buildingsOwned;
     });

     constructor(private buildingsService: BuildingsService) { }


     public ngOnInit(): void {
     }

     public ngOnDestroy(): void {
          this.subscriptionToBuildings.unsubscribe();
     }

}
