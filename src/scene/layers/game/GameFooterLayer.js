import GameFooterButtonDown from "../../../buttons/game-footer/GameFooterButtonDown";
import GameFooterButtonRight from "../../../buttons/game-footer/GameFooterButtonRight";
import GameFooterButtonLeft from "../../../buttons/game-footer/GameFooterButtonLeft";

export default class GameFooterLayer {
	constructor(ctx, scene, props = {}) {
		this.ctx = ctx
		this.scene = scene
		this.x = -app.size.w/2
		this.y = 0
		this.h = 170
		this.isActive = props.isActive ?? true
		this.typeButtons = 'game_control'
		this.buttons = {
			left: new GameFooterButtonLeft(ctx, {
				x: 0,
				y: app.size.h/2 - this.h,
				w: app.size.w/3,
				h: this.h,
				type: this.typeButtons,
				name: 'left'
			}),
			down: new GameFooterButtonDown(ctx, {
				x: (app.size.w/3),
				y: app.size.h/2 - this.h,
				w: app.size.w/3,
				h: this.h,
				type: this.typeButtons,
				name: 'down'
			}),
			right: new GameFooterButtonRight(ctx, {
				x: (app.size.w/3) * 2,
				y: app.size.h/2 - this.h,
				w: app.size.w/3,
				h: this.h,
				type: this.typeButtons,
				name: 'right'
			}),
		}
		this.buttonHover = false
		this.init()
	}

	init() {
		for (const key in this.buttons) {
			app.stateButtons.add(this.typeButtons, key)
		}
	}

	destroy() {
		for (const key in this.buttons) {
			this.buttons[key].destroy()
			app.stateButtons.remove(this.typeButtons, key)
		}
		app.cnv.style.cursor = ''
	}

	setActive(bool) {
		this.isActive = bool
		for (const key in this.buttons) {
			this.buttons[key].setActive(bool)
		}
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)

		for (const key in this.buttons) {
			this.buttons[key].draw()
		}

		this.ctx.restore()
	}

	update(delta) {
		this.buttonHover = false
		for (const key in this.buttons) {
			if (this.buttons[key].hover) {
				this.buttonHover = true
			}
		}
	}
}