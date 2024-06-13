import TEXT from "../../../constants/TEXT";
import TextButton from "../../../buttons/TextButton";
import STYLE from "../../../constants/STYLE";
import LoadLayer from "../LoadLayer";

export default class MainMenuLayer {
	constructor(ctx, { isActive = true } = {}) {
		this.ctx = ctx
		this.isActive = isActive
		this.x = 0
		this.y = 0
		this.titleSize = STYLE.TEXT_SIZE.BASE_TITLE
		this.titleFont = `${ this.titleSize }px ${ STYLE.FONT_FAMILY.BASE }`
		this.titleY = 0
		this.sectionButtons = [
			new TextButton(ctx, { text: TEXT.NEW_GAME,    isActive: this.isActive, handler: () => app.scene.start('Game') }),
			new TextButton(ctx, { text: TEXT.CONTROL,     isActive: this.isActive, handler: () => app.scene.start('Control') }),
			new TextButton(ctx, { text: TEXT.HOW_TO_PLAY, isActive: this.isActive, handler: () => app.scene.start('About') })
		]
		this.languageButtons = [
			new TextButton(ctx, { text: 'РУ', handler: () => this.changeLanguage('ru'), isActive: this.isActive }),
			new TextButton(ctx, { text: 'EN', handler: () => this.changeLanguage('en'), isActive: this.isActive }),
			new TextButton(ctx, { text: 'TR', handler: () => this.changeLanguage('tr'), isActive: this.isActive })
		]
		this.buttons = [ ...this.sectionButtons, ...this.languageButtons ]
		this.init()
	}

	init() {
		if (app.user.game) {
			const btnContinue = new TextButton(this.ctx, {
				text: TEXT.CONTINUE,
				isActive: this.isActive,
				handler: () => app.scene.start('Game', { isContinue: true })
			})
			this.sectionButtons.unshift(btnContinue)
			this.buttons.unshift(btnContinue)
		}

		const paddingTitle = 80
		const paddingButtons = 20
		const top = -(this.titleSize + paddingTitle + (this.buttons[0].h + paddingButtons) * (this.sectionButtons.length+1)) / 2
		const btnTop = top + this.titleSize + paddingTitle + this.buttons[0].h/2
		this.titleY = top + this.titleSize
		this.sectionButtons.forEach((btn, i) => btn.updatePosition(0, btnTop + (this.buttons[0].h + paddingButtons) * i))
		this.languageButtons.forEach((btn, i) => btn.updatePosition(
			(this.languageButtons[0].w + paddingButtons) * i - ((this.languageButtons[0].w + paddingButtons) * (this.languageButtons.length-1) / 2),
			btnTop + (this.buttons[0].h + paddingButtons) * this.sectionButtons.length))
	}

	destroy() {
		this.buttons.forEach(btn => btn.destroy())
		app.cnv.style.cursor = ''
	}

	changeLanguage(lang) {
		app.user.changeLanguage(lang)
		app.scene.start('Main')
	}

	setActive(bool) {
		this.isActive = bool
		this.buttons.forEach(btn => btn.setActive(this.isActive))
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.shadowBlur = 4
		this.ctx.shadowColor = `rgba(0,0,0,0.1)`
		this.ctx.shadowOffsetX = 2
		this.ctx.shadowOffsetY = 2
		this.ctx.font = this.titleFont
		this.ctx.fillStyle = STYLE.COLOR.BASE_DARK
		this.ctx.textAlign = 'center'
		this.ctx.fillText(`${ TEXT.RECORD }: ${ app.user.record }`, 0, this.titleY)
		this.buttons.forEach(btn => btn.draw())
		this.ctx.restore()
	}

	update() {
		app.cnv.style.cursor = this.buttons.some(btn => btn.hover) ? 'pointer' : 'initial'
	}
}