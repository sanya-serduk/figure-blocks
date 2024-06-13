import MainMenuLayer from "./layers/main/MainMenuLayer";

export default class Main {
	constructor(ctx, { isActive = true } = {}) {
		this.ctx = ctx
		this.isActive = isActive
		this.menuLayer = new MainMenuLayer(ctx, { isActive })
	}

	destroy() {
		this.menuLayer.destroy()
	}

	setActive(bool) {
		this.isActive = bool
		this.menuLayer.setActive(bool)
	}

	draw() {
		this.menuLayer.draw()
	}

	update(delta) {
		this.menuLayer.update(delta)
	}
}