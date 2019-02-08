import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../resources.service';
import { Resource } from '../objects/resource';

@Component({
  selector: 'app-clickable',
  templateUrl: './clickable.component.html',
  styleUrls: ['./clickable.component.css']
})
export class ClickableComponent implements OnInit {

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
