import { Injectable } from '@angular/core';

@Injectable({
     providedIn: 'root'
})
export class HelperService {

     public static getRandomInteger(max: number, min: number): number {
          let randomInteger: number;

          randomInteger = Math.floor(Math.random() * (max - min + 1) + min);

          return randomInteger;
     }

     constructor() { }

     public getRandomInteger(max: number, min: number): number {
          let randomInteger: number;

          randomInteger = Math.floor(Math.random() * (max - min + 1) + min);

          return randomInteger;
     }

     public fromJSON(object: any, objectAsJson: any): any {
          for (const propName in objectAsJson) {
               if (object.hasOwnProperty(propName)) {
                    object[propName] = objectAsJson[propName];
               }
          }
          return object;
     }

}
