export class Resource {
	name: string;
	quantity: number;
	clickValue: number;
	multiplier: number;
	perTick: number;
	accrue(speedMultiplier) {
		this.quantity = this.quantity + ((this.perTick * this.multiplier) * speedMultiplier);
	}
	produce() {
		this.quantity = this.quantity + (this.clickValue * this.multiplier);
	};
	spend(amountToSpend) {
		this.quantity = this.quantity - amountToSpend;
	};
	constructor (name: string, quantity: number, clickValue: number, multiplier: number, perTick = 0) {
		this.name = name;
		this.quantity = quantity;
		this.clickValue = clickValue;
		this.multiplier = multiplier;
		this.perTick = perTick;
	}
}
