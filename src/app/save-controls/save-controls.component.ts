import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../game-state.service';

@Component({
     selector: 'app-save-controls',
     templateUrl: './save-controls.component.html',
     styleUrls: ['./save-controls.component.css']
})
export class SaveControlsComponent implements OnInit {

     constructor(private saveService: GameStateService) { }

     public ngOnInit() {
     }

     // These are all just calls to the saveService's functions. This seems... wrong, somehow.
     public save(): void {
          this.saveService.saveData();
     }
     public load(): void {
          this.saveService.loadData();
     }
     public reset(): void {
          this.saveService.resetData();
     }

}
