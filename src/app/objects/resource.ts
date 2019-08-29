import { SaveableObject } from './saveable-object';

export class Resource {
     public name: string;
     public quantity: number;
     public multiplier: number;
     public perTick: number;
     public earnings: IncomeItem[] = [];
     // Receives values and returns a resource with the appropriate values.
     // Must have a name. Everything else has a default.
     constructor(name: string, quantity: number = 0, multiplier: number = 1, earnings: any[] = []) {
          this.name = name;
          this.quantity = quantity;
          this.multiplier = multiplier;
          this.earnings = earnings;
          this.calculatePerTick();
     }
     // Maybe unnecessary? This fires to get the new total every tick in-game.
     // Consider separating this out; resources don't necessarily accrue, things produce a resource.
     public accrue(speedMultiplier: number): void {
          this.quantity = this.quantity + ((this.perTick * this.multiplier) * speedMultiplier);
     }
     // This figures how much should be earned with each tick.
     public calculatePerTick(): void {
          this.perTick = 0;

          if (this.earnings) {
               for (const incomeItem of this.earnings) {
                    this.perTick = this.perTick + incomeItem.amount;
               }
          }

     }
     // Determines if a certain amount (passed as a parameter) CAN be spent and returns a bool representing that status,
     // and then subtracts the amountToSpend from the current total.
     // TODO: Separate out the spending and determining if a value is affordable. I should be able to check the affordability
     // of something without actually buying it.
     public spend(amountToSpend: number): boolean {
          let couldPurchase = false;
          if (this.quantity >= amountToSpend) {
               this.quantity = this.quantity - amountToSpend;
               couldPurchase = true;
          }
          return couldPurchase;
     }
     // Takes in an amount and adds it to the array of things that produce the resource as an IncomeItem.
     public updateIncome(incomeSource: string, incomeAmount: number): void {
          let updatedIncome = false;
          for (const incomeItem of this.earnings) {
               if (incomeItem.name === incomeSource) {
                    incomeItem.amount = incomeAmount;
                    updatedIncome = true;
                    break;
               }
          }
          if (updatedIncome === false) {
               this.earnings.push({ name: incomeSource, amount: incomeAmount });
          }
          this.calculatePerTick();
     }
}

// export class SaveableResource implements SaveableObject {
//      id: number;
//      name: string;
//      quantity: number;
//      multiplier: number;
//      perTick: number;
//      earnings: IncomeItem[] = [];
//      deserialize(objectAsJson: any): SaveableObject {
//           const deserializedResource = new SaveableResource();
//           deserializedResource.id = objectAsJson.id;
//           deserializedResource.name = objectAsJson.name;
//           deserializedResource.quantity = objectAsJson.quantity;
//           deserializedResource.perTick = objectAsJson.perTick;
//           return deserializedResource;
//      }
// }

interface IncomeItem {
     name: string;
     amount: number;
}

export const RESOURCES: Resource[] = [
     new Resource('gold', 500)
];
