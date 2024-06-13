import TEXT from "../../../constants/TEXT";
import GameHeaderButtonPaused from "../../../buttons/game-header/GameHeaderButtonPaused";
import GameHeaderButtonInfo from "../../../buttons/game-header/GameHeaderButtonInfo";
import GameHeaderButtonReload from "../../../buttons/game-header/GameHeaderButtonReload";
import GameHeaderButtonHome from "../../../buttons/game-header/GameHeaderButtonHome";
import STYLE from "../../../constants/STYLE";

export default class GameHeaderLayer {
	constructor(ctx, scene, props = {}) {
		this.ctx = ctx
		this.scene = scene
		this.x = -app.size.w/2
		this.y = -app.size.h/2
		this.isActive = props.isActive ?? true
		this.buttons = [
			new GameHeaderButtonPaused(ctx, { x: app.size.w-78-9,   y:0, w:78, h:90, handler: () => this.scene.setPaused(), scene }),
			new GameHeaderButtonInfo(ctx,   { x: app.size.w-78*2-9, y:0, w:78, h:90, handler: () => this.scene.openModal('Info', false)}),
			new GameHeaderButtonReload(ctx, { x: app.size.w-78*3-9, y:0, w:78, h:90, handler: () => this.scene.openModal('Reload') }),
			new GameHeaderButtonHome(ctx,   { x: app.size.w-78*4-9, y:0, w:78, h:90, handler: () => app.scene.start('Main') }),
		]
		this.buttonHover = false
	}

	destroy() {
		this.buttons.forEach(btn => btn.destroy())
	}

	setActive(bool) {
		this.isActive = bool
		this.buttons.forEach(btn => btn.setActive(bool))
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.shadowBlur = 4
		this.ctx.shadowColor = `rgba(0,0,0,0.1)`
		this.ctx.shadowOffsetX = 2
		this.ctx.shadowOffsetY = 2
		this.ctx.font = `bold 48px ${ STYLE.FONT_FAMILY.BASE }`
		this.ctx.fillStyle = STYLE.COLOR.BASE_DARK
		this.ctx.textAlign = 'left'
		this.ctx.textBaseline = 'middle'
		this.ctx.fillText(`${ TEXT.SCORE }: ${ app.user.score }`, 12, 52)

		this.buttons.forEach(btn => btn.draw())

		this.ctx.restore()
	}

	update(delta) {
		this.buttonHover = this.buttons.some(btn => btn.hover)
	}
}