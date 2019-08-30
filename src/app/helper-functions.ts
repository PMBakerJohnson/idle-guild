export function getRandomInteger(max: number, min: number): number {
     let randomInteger: number;

     randomInteger = Math.floor(Math.random() * (max - min + 1) + min);

     return randomInteger;
}

export function fromJSON(object: any, objectAsJson: any): any {
     for (const propName in objectAsJson) {
          if (object.hasOwnProperty(propName)) {
               object[propName] = objectAsJson[propName];
          }
     }

     return object;
}
