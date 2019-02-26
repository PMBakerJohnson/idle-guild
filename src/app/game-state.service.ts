import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor() {
    this.loadData();
  }

  savedData: Array<SaveData> = [];

  // Accepts a key and returns an array of generic JSON objects from the saved data
  public pullSavedData(key: string): Array<object> {
    let returnData = [];

    let loadedData = this.savedData.find(loadData => {
      return loadData.key === key;
    });

    if(loadedData !== undefined) {
      returnData = loadedData.data;
    }

    return returnData;
  }
  public pushSaveData(key: string, dataToSave: Array<any>): void {
    this.savedData.push({ key: key, data: dataToSave });
  }
  public saveData() {
    this.savedData = [];
    this.saveEvent$.next('SAVE');
    localStorage.setItem("saveData", JSON.stringify(this.savedData));
  }
  public loadData() {
    if (localStorage.getItem("saveData") !== null) {
      this.savedData = JSON.parse(localStorage.getItem("saveData"));
    }
    this.saveEvent$.next('LOAD');
  }
  public resetData() {
    localStorage.removeItem("saveData");
  }


  public saveEvent$ = new Subject<string>();

}

class SaveData {
  key: string;
  data: Array<any>;
}
