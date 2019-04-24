export class localStorage {
     public setItem(key: string, data: string): void {
          this[key] = data;
     };
     public getItem(selectedDataKey: string): any[] {
          return this[selectedDataKey];
     }
}
