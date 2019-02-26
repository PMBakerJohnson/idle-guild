export class Resource {
	name: string;
	quantity: number;
	multiplier: number;
	perTick: number;
	earnings: IncomeItem[] = [];
	accrue(speedMultiplier) {
		this.quantity = this.quantity + ((this.perTick * this.multiplier) * speedMultiplier);
	};
	calculatePerTick() {
		this.perTick = 0;

		if (this.earnings) {
			for (let incomeItem of this.earnings) {
				this.perTick = this.perTick + incomeItem.amount;
			}
		}

	};
	spend(amountToSpend): boolean {
		let couldPurchase: boolean = false;
		if(this.quantity > amountToSpend) {
			this.quantity = this.quantity - amountToSpend;
			couldPurchase = true;
		}
		return couldPurchase;
	};
	constructor(name: string, quantity = 0, multiplier = 1, earnings = []) {
		this.name = name;
		this.quantity = quantity;
		this.multiplier = multiplier;
		this.earnings = earnings;
		this.calculatePerTick();
	};

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
