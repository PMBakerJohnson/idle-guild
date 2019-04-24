export class Resource {
	name: string;
	quantity: number;
	multiplier: number;
	perTick: number;
	earnings: IncomeItem[] = [];
	// Receives values and returns a resource with the appropriate values.
		// Must have a name. Everything else has a default.
	constructor(name: string, quantity = 0, multiplier = 1, earnings = []) {
		this.name = name;
		this.quantity = quantity;
		this.multiplier = multiplier;
		this.earnings = earnings;
		this.calculatePerTick();
	};
	// Maybe unnecessary? This fires to get the new total every tick in-game.
		// Consider separating this out; resources don't necessarily accrue, things produce a resource.
	accrue(speedMultiplier: number) {
		this.quantity = this.quantity + ((this.perTick * this.multiplier) * speedMultiplier);
	};
	// This figures how much should be earned with each tick.
	calculatePerTick() {
		this.perTick = 0;

		if (this.earnings) {
			for (let incomeItem of this.earnings) {
				this.perTick = this.perTick + incomeItem.amount;
			}
		}

	};
	// Determines if a certain amount (passed as a parameter) CAN be spent and returns a bool representing that status, and then subtracts the amountToSpend from the current total.
		// TODO: Separate out the spending and determining if a value is affordable. I should be able to check the affordability of something without actually buying it.
	spend(amountToSpend: number): boolean {
		let couldPurchase: boolean = false;
		if(this.quantity >= amountToSpend) {
			this.quantity = this.quantity - amountToSpend;
			couldPurchase = true;
		}
		return couldPurchase;
	};
	// Takes in an amount and adds it to the array of things that produce the resource as an IncomeItem.
	updateIncome(incomeSource: string, incomeAmount: number) {
		let updatedIncome: boolean = false;
		for(let incomeItem of this.earnings) {
			if (incomeItem.name === incomeSource) {
				incomeItem.amount = incomeAmount;
				updatedIncome = true;
				break;
			}
		}
		if(updatedIncome === false) {
			this.earnings.push({ name: incomeSource, amount: incomeAmount });
		}
		this.calculatePerTick();
	}
}

interface IncomeItem {
	name: string,
	amount: number
}

export const RESOURCES: Resource[] = [
	new Resource('gold', 500)
]
