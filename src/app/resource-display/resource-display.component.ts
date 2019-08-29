import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../resources.service';
import { Resource } from '../objects/resource';
import { Subscription } from 'rxjs';

@Component({
     selector: 'app-resource-display',
     templateUrl: './resource-display.component.html',
     styleUrls: ['./resource-display.component.css']
})
export class ResourceDisplayComponent implements OnInit {

     public resources: Resource[];

     public subscription: Subscription = this.resourcesService.resourcesSubject$.subscribe(resources => {
          this.resources = resources;
     });

     constructor(public resourcesService: ResourcesService) {
     }

     public ngOnInit(): void {
     }

}
