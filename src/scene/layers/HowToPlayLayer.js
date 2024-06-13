import TEXT from "../../constants/TEXT";
import TextButton from "../../buttons/TextButton";
import ScrollSystem from "../../system/ScrollSystem";
import FIGURES from "../../constants/FIGURES";
import HelperVisual from "../../system/HelperVisual";
import STYLE from "../../constants/STYLE";
import Helper from "../../system/Helper";

export default class HowToPlayLayer {
	constructor(ctx, { btnBackName = TEXT.BACK, btnBackHandler = () => app.scene.start('Main') } = {}) {
		this.ctx = ctx
		this.x = 0
		this.y = 0
		this.btnBack = new TextButton(ctx, { text: btnBackName, handler: btnBackHandler })
		this.buttonHover = false
		this.figures = []
		this.h = 840
		this.scrollSystem = new ScrollSystem(this)
		this.init()
	}

	init() {
		const nameSkin = ['green', 'red', 'purple', 'blue']
		FIGURES.forEach((figure) => {
			if (!this.figures.find(item => item.price === figure.price)) {
				this.figures.push({
					price: figure.price,
					image: HelperVisual.getFigure({
						pattern: figure.pattern,
						tileName: nameSkin[this.figures.length],
						tileSize: 78
					})
				})
			}
		})

		this.figures.sort((a, b) => a.price - b.price)
	}

	destroy() {
		this.scrollSystem.destroy()
		this.btnBack.destroy()
	}

	drawTitle() {
		this.ctx.save()
		this.ctx.translate(app.size.w/2, 0)
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'top'
		this.ctx.fillStyle = STYLE.COLOR.BASE_DARK
		this.ctx.font = `${ STYLE.TEXT_SIZE.BASE_TITLE }px ${ STYLE.FONT_FAMILY.BASE }`
		this.ctx.fillText(TEXT.HOW_TO_PLAY, 0, 0)
		this.ctx.restore()
	}

	drawDescriptionFigures() {
		this.ctx.save()
		this.ctx.translate(app.size.w/2, 0)
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'top'
		this.ctx.fillStyle = STYLE.COLOR.BASE_DARK
		this.ctx.font = `${ STYLE.TEXT_SIZE.BASE_DESC }px ${ STYLE.FONT_FAMILY.BASE }`
		let textLineCounter = 0
		const lines = TEXT.HOW_TO_PLAY_DESCRIPTION_FIGURES.split('\n')

		lines.forEach(line => {
			this.ctx.fillText(line, 0, STYLE.TEXT_SIZE.BASE_DESC * textLineCounter)
			textLineCounter++
		})

		this.ctx.restore()
	}

	drawDescriptionSuperTiles() {
		this.ctx.save()
		this.ctx.translate(app.size.w/2, 0)
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'top'
		this.ctx.fillStyle = STYLE.COLOR.BASE_DARK
		this.ctx.font = `${ STYLE.TEXT_SIZE.BASE_DESC }px ${ STYLE.FONT_FAMILY.BASE }`

		this.ctx.fillText(TEXT.HOW_TO_PLAY_DESCRIPTION_SUPER_TILES, 0, 0)

		this.ctx.restore()
	}

	drawFigures() {
		this.ctx.save()
		this.ctx.translate(32, 0)
		const offsetX = 100
		const offsetY = 200

		this.ctx.textAlign = 'left'
		this.ctx.textBaseline = 'top'

		this.figures.forEach((figure, i) => {
			const cardBack = Helper.getPath2DRoundRect(0, 0, figure.image.width + 80, figure.image.height + 180, 20)
			this.ctx.fillStyle = STYLE.COLOR.BASE_LIGHT
			this.ctx.fill(cardBack)
			this.ctx.drawImage(figure.image, 40, 140)

			this.ctx.fillStyle = STYLE.COLOR.BASE_DARK
			this.ctx.font = `42px ${ STYLE.FONT_FAMILY.BASE }`
			this.ctx.fillText(`${ figure.price } ${ TEXT.POINTS }`, 40, 40)

			this.ctx.beginPath()
			this.ctx.strokeStyle = STYLE.COLOR.BASE_DARK
			this.ctx.lineWidth = 2
			this.ctx.moveTo(40, 100)
			this.ctx.lineTo(figure.image.width + 40, 100)
			this.ctx.stroke()
			this.ctx.closePath()

			if (i % 2) {
				this.ctx.translate(-(figure.image.width + offsetX), figure.image.height + offsetY )
			} else {
				this.ctx.translate(figure.image.width + offsetX, 0 )
			}
		})
		this.ctx.restore()
	}

	drawSuperTiles() {
		this.ctx.save()
		this.ctx.translate(32, 0)

		this.ctx.textAlign = 'left'
		this.ctx.textBaseline = 'top'

		this.ctx.fillStyle = STYLE.COLOR.BASE_LIGHT
		const cardBackSuper = Helper.getPath2DRoundRect(0, 0, 660, 160, 20)
		this.ctx.fill(cardBackSuper)
		this.ctx.translate(40, 40)
		this.ctx.drawImage(app.resources.tiles.mixed, -2, -2)

		this.ctx.translate(110, 0)
		this.ctx.fillStyle = STYLE.COLOR.BASE_DARK
		this.ctx.font = `42px ${ STYLE.FONT_FAMILY.BASE }`
		this.ctx.fillText(`${ TEXT.MIXED }`, 0, 0)

		this.ctx.font = `32px ${ STYLE.FONT_FAMILY.BASE }`
		this.ctx.fillText(`${ TEXT.TILE_MIXED_DESC }`, 0, 50)

		this.ctx.fillStyle = STYLE.COLOR.BASE_LIGHT
		this.ctx.translate(-150, 140)
		this.ctx.fill(cardBackSuper)
		this.ctx.translate(40, 40)
		this.ctx.drawImage(app.resources.tiles.bomb, -2, -2)

		this.ctx.translate(110, 0)
		this.ctx.fillStyle = STYLE.COLOR.BASE_DARK
		this.ctx.font = `42px ${ STYLE.FONT_FAMILY.BASE }`
		this.ctx.fillText(`${ TEXT.DESTROYER }`, 0, 0)

		this.ctx.font = `32px ${ STYLE.FONT_FAMILY.BASE }`
		this.ctx.fillText(`${ TEXT.TILE_DESTROYER_DESC }`, 0, 50)
		this.ctx.restore()
	}

	draw() {
		this.ctx.save()
		this.ctx.shadowBlur = 4
		this.ctx.shadowColor = `rgba(0,0,0,0.2)`
		this.ctx.shadowOffsetX = 2
		this.ctx.shadowOffsetY = 2

		this.ctx.translate(this.x-app.size.w/2, this.y-app.size.h/2+80)
		this.drawTitle()

		this.ctx.translate(0, 130)
		this.drawDescriptionFigures()

		this.ctx.translate(0, 200)
		this.drawFigures()

		this.ctx.translate(0, 940)
		this.drawDescriptionSuperTiles()

		this.ctx.translate(0, 120)
		this.drawSuperTiles()

		this.ctx.restore()

		this.ctx.save()
		this.btnBack.draw()
		this.btnBack.updatePosition(0, app.size.h/2 - this.btnBack.h/2-80)
		this.ctx.restore()
	}

	update(delta) {
		this.buttonHover = this.btnBack.hover
		this.scrollSystem.update(delta)
	}
}