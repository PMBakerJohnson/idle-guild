import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../resources.service';
import { Resource } from '../objects/resource'

@Component({
  selector: 'app-resource-display',
  templateUrl: './resource-display.component.html',
  styleUrls: ['./resource-display.component.css']
})
export class ResourceDisplayComponent implements OnInit {

  constructor(public resourcesService: ResourcesService) { }

  ngOnInit() {
		this.getResources();
  }

	resources: Resource[];

	getResources(): void {
		this.resourcesService.getResources()
			.subscribe(resources => this.resources = resources);
	}

}
