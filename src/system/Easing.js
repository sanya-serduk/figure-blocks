export default class Easing {
	static easeInOutQuad(x) {
		return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
	}

	static easeInOutQuart(x) {
		return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
	}

	static easeOutQuart(x) {
		return 1 - Math.pow(1 - x, 4);
	}

	static easeOutExpo(x) {
		return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
	}

	static easeInOutSine(x) {
		return -(Math.cos(Math.PI * x) - 1) / 2;
	}

	static easeInSine(x) {
		return 1 - Math.cos((x * Math.PI) / 2);
	}

	static easeOutSine(x) {
		return Math.sin((x * Math.PI) / 2);
	}

	static easeInOutBack(x) {
		const c1 = 1.70158;
		const c2 = c1 * 1.525;

		return x < 0.5
			? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
			: (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
	}

	static easeOutBack(x) {
		const c1 = 1.70158;
		const c3 = c1 + 1;

		return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
	}

	static easeInOutCirc(x) {
		return x < 0.5
			? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
			: (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
	}

	static easeOutCubic(x) {
		return 1 - Math.pow(1 - x, 3);
	}
}