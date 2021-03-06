import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class GameStateService {

     // OBSERVABLE(S) - Things that subscribe to this will receive a notification
     public saveEvent$: Subject<string> = new Subject<string>();

     // INTERNAL VARIABLES
     private savedData: Array<SaveData> = [];

     constructor() {
          this.loadData();
     }

     // DATA MANAGEMENT
     /** Accepts a key and returns an array of generic JSON objects from the saved data */
     public pullSavedData(key: string): Array<object> {
          let returnData = [];

          const loadedData = this.savedData.find(loadData => {
               return loadData.key === key;
          });

          if (loadedData !== undefined) {
               returnData = loadedData.data;
          }

          return returnData;
     }
     /** Accepts data as an array of values and a key to associate it with and saves it in localStorage */
     public pushSaveData(key: string, dataToSave: Array<any>): void {
          this.savedData.push({ key: key, data: dataToSave });
     }


     // EVENT TRIGGERS - These get called to trigger everything else to happen.
     // Usually they'll perform one simple action, like interacting with LocalStorage.
     public saveData(): void {
          this.savedData = [];
          this.saveEvent$.next('SAVE');
          localStorage.setItem('saveData', JSON.stringify(this.savedData));
     }
     public loadData(): void {
          if (localStorage.getItem('saveData') !== null) {
               this.savedData = JSON.parse(localStorage.getItem('saveData'));
          }
          this.saveEvent$.next('LOAD');
     }
     public resetData(): void {
          localStorage.removeItem('saveData');
     }
}
// Mostly just functions as a reminder of what format I'm wanting to accept and receive data in.
interface SaveData {
     key: string;
     data: Array<any>;
}
