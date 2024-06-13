import TEXT from "../constants/TEXT";
import HowToPlayLayer from "./layers/HowToPlayLayer";

export default class About {
	constructor(ctx) {
		this.ctx = ctx
		this.howToPlayLayer = new HowToPlayLayer(ctx, {
			btnBackName: TEXT.BACK,
			btnBackHandler: () => app.scene.start('Main')
		})
	}

	destroy() {
		this.howToPlayLayer.destroy()
		app.cnv.style.cursor = ''
	}

	draw() {
		this.howToPlayLayer.draw()
	}

	update(delta) {
		this.howToPlayLayer.update(delta)
		this.buttonHover = this.howToPlayLayer.buttonHover
		app.cnv.style.cursor = this.howToPlayLayer.buttonHover ? 'pointer' : 'initial'
	}
}