import { Subject } from 'rxjs';

export class mockGameStateService {
     public pushSaveData(key: string, dataToSave: Array<any>): void {
          let aDataItem = this.data.find(dataItem => dataItem["key"] === key);
          if (aDataItem === undefined) {
               this.data.push({ key: key, data: dataToSave });
          } else {
               this.data[this.data.indexOf(aDataItem)] === dataToSave;
          }
     };
     public pullSavedData(key: string): any[] {
          let mockSavedData = JSON.parse(JSON.stringify(this.data.find( dataItem => dataItem["key"] === key )));
          return mockSavedData;
     }
     public saveData(): void {
          this.saveEvent$.next('SAVE');
     };
     public loadData(): void {
          this.saveEvent$.next('LOAD');
     };
     public resetData(): void {};
     public saveEvent$ = new Subject<string>();
     private data: object[];
}
