import HowToPlayLayer from "../HowToPlayLayer";
import TEXT from "../../../constants/TEXT";

export default class GameInfoLayer {
	constructor(ctx, scene) {
		this.ctx = ctx
		this.scene = scene
		this.w = app.size.w
		this.h = app.size.h
		this.buttonHover = false
		this.howToPlayLayer = new HowToPlayLayer(ctx, {
			btnBackName: TEXT.CLOSE,
			btnBackHandler: () => this.scene.closeModal()
		})
	}

	destroy() {
		this.howToPlayLayer.destroy()
	}

	draw() {
		this.howToPlayLayer.draw()
	}

	update(delta) {
		this.howToPlayLayer.update(delta)
		this.buttonHover = this.howToPlayLayer.buttonHover
	}
}