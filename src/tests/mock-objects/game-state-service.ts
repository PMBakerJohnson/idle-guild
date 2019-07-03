import { Subject } from 'rxjs';

export class mockGameStateService {
     static defaultData: any[];

     constructor() {
          if(mockGameStateService.defaultData !== undefined) {
               this.data = mockGameStateService.defaultData;
          } else {
               this.data = [];
          }
     };

     public pushSaveData(key: string, dataToSave: Array<any>): void {
          let saveObject = JSON.parse(
               JSON.stringify(
                    { key: key, data: dataToSave }
               ));
          let match = this.data.find(dataItem => dataItem["key"] === key);
          if (matchMedia === undefined) {
               this.data.push(saveObject);
          } else {
               this.data[this.data.indexOf(match)] = saveObject;
          }
     };
     public pullSavedData(key: string): Array<object> {
          let returnValue: Array<object>
          let mockSavedData = this.data.find(
               dataItem => dataItem["key"] === key
          );
          if (mockSavedData !== undefined) {
               returnValue = mockSavedData["data"];
          } else {
               returnValue = [];
          }
          return returnValue;
     }
     public saveData(): void {
          this.saveEvent$.next('SAVE');
     };
     public loadData(): void {
          this.saveEvent$.next('LOAD');
     };
     public resetData(): void {};
     public saveEvent$ = new Subject<string>();
     private data: any[];
}
