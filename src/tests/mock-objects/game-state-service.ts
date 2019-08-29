import { Subject } from 'rxjs';
import { GameStateService } from 'src/app/game-state.service';

export class MockGameStateService extends GameStateService {
     static defaultData: any[];

     constructor() {
          super();
          if (MockGameStateService.defaultData !== undefined) {
               this.data = MockGameStateService.defaultData;
          } else {
               this.data = [];
          }
     }

     private data: any[];
     public saveEvent$ = new Subject<string>();

     public pushSaveData(key: string, dataToSave: Array<any>): void {
          const saveObject = JSON.parse(
               JSON.stringify(
                    { key: key, data: dataToSave }
               ));
          const match = this.data.find(dataItem => dataItem['key'] === key);
          if (matchMedia === undefined) {
               this.data.push(saveObject);
          } else {
               this.data[this.data.indexOf(match)] = saveObject;
          }
     }
     public pullSavedData(key: string): Array<object> {
          let returnValue: Array<object>;
          const mockSavedData = this.data.find(
               dataItem => dataItem['key'] === key
          );
          if (mockSavedData !== undefined) {
               returnValue = mockSavedData['data'];
          } else {
               returnValue = [];
          }
          return returnValue;
     }
     public saveData(): void {
          this.saveEvent$.next('SAVE');
     }
     public loadData(): void {
          this.saveEvent$.next('LOAD');
     }
     public resetData(): void { }
}
