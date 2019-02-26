import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../game-state.service';

@Component({
  selector: 'app-save-controls',
  templateUrl: './save-controls.component.html',
  styleUrls: ['./save-controls.component.css']
})
export class SaveControlsComponent implements OnInit {

  constructor(private saveService: GameStateService) { }

  ngOnInit() {
  }

  save(): void {
    this.saveService.saveData();
  }
  load(): void {
    this.saveService.loadData();
  }

  reset(): void {
    this.saveService.resetData();
  }

}
