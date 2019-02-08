import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../resources.service';

@Component({
  selector: 'app-clickable',
  templateUrl: './clickable.component.html',
  styleUrls: ['./clickable.component.css']
})
export class ClickableComponent implements OnInit {

  constructor(public resourcesService: ResourcesService) { }

  ngOnInit() {
  }

}
