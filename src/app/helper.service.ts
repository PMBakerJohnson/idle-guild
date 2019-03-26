import { Injectable } from '@angular/core';

@Injectable({
     providedIn: 'root'
})
export class HelperService {

     constructor() { }

     getRandomInteger(max: number, min: number): number {
          let randomInteger: number = undefined;

          randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
          
          return randomInteger;
     }

}
