import Helper from "../../../system/Helper";
import TextButton from "../../../buttons/TextButton";
import TEXT from "../../../constants/TEXT";
import STYLE from "../../../constants/STYLE";

export default class GameOverLayer {
	constructor(ctx, scene) {
		this.ctx = ctx
		this.scene = scene
		this.x = 0
		this.y = 0
		this.w = 620
		this.h = 550
		this.titleSize = STYLE.TEXT_SIZE.BASE_TITLE
		this.titleFont = `${ this.titleSize }px ${ STYLE.FONT_FAMILY.BASE }`
		this.path2D = Helper.getPath2DRoundRect(0, 0, this.w, this.h, 8)
		this.buttonHover = false
		this.buttons = [
			new TextButton(ctx, { text: TEXT.START_OVER, y: -80, handler: () => this.scene.reload(),     dark: true  }),
			new TextButton(ctx, { text: TEXT.EXIT,       y: 70,  handler: () => app.scene.start('Main'), dark: true  }),
		]
	}

	destroy() {
		this.buttons.forEach(btn => btn.destroy())
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(-this.w/2, -this.h/2-80)
		this.ctx.shadowBlur = 4
		this.ctx.shadowColor = `rgba(0,0,0,0.2)`
		this.ctx.shadowOffsetX = 2
		this.ctx.shadowOffsetY = 2
		this.ctx.fillStyle = STYLE.COLOR.BASE_LIGHT
		this.ctx.strokeStyle = STYLE.COLOR.BASE_DARK
		this.ctx.fill(this.path2D)
		this.ctx.stroke(this.path2D)
		this.ctx.restore()

		this.ctx.font = this.titleFont
		const titleText = `${ TEXT.GAME_OVER }`
		this.ctx.shadowBlur = 4
		this.ctx.shadowColor = `rgba(0,0,0,0.1)`
		this.ctx.shadowOffsetX = 2
		this.ctx.shadowOffsetY = 2
		this.ctx.fillStyle = STYLE.COLOR.BASE_DARK
		this.ctx.textAlign = 'center'
		this.ctx.fillText(titleText, 0, -220)

		this.ctx.save()
		this.buttons.forEach(btn => btn.draw())
		this.ctx.restore()
	}

	update(delta) {
		this.buttonHover = this.buttons.some(btn => btn.hover)
	}
}