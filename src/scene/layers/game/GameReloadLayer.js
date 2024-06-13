import TextButton from "../../../buttons/TextButton";
import TEXT from "../../../constants/TEXT";

export default class GameReloadLayer {
	constructor(ctx, scene) {
		this.ctx = ctx
		this.scene = scene
		this.x = 0
		this.y = 0
		this.w = 650
		this.h = 400
		this.buttonHover = false
		this.buttons = [
			new TextButton(ctx, { text: TEXT.START_OVER, y: -150, handler: () => this.scene.reload(),     dark: true  }),
			new TextButton(ctx, { text: TEXT.CANCEL,     y: 0,    handler: () => this.scene.closeModal(), dark: true  }),
		]
	}

	destroy() {
		this.buttons.forEach(btn => btn.destroy())
	}

	draw() {
		this.ctx.save()
		this.buttons.forEach(btn => btn.draw())
		this.ctx.restore()
	}

	update(delta) {
		this.buttonHover = this.buttons.some(btn => btn.hover)
	}
}