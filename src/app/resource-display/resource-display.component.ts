import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../resources.service';
import { Resource, RESOURCES } from '../objects/resource'

@Component({
  selector: 'app-resource-display',
  templateUrl: './resource-display.component.html',
  styleUrls: ['./resource-display.component.css']
})
export class ResourceDisplayComponent implements OnInit {

  constructor(public resourcesService: ResourcesService) {
  }

  ngOnInit() {
  }

	resources: Resource[];

  public subscription = this.resourcesService.resourcesSubject$.subscribe(resources => {
    this.resources = resources;
  });
}