import Helper from "./Helper";
import STYLE from "../constants/STYLE";
import TILES from "../constants/TILES";

export default class HelperVisual {
	static createCanvas(w, h) {
		const cnv = document.createElement('canvas')
		const ctx = cnv.getContext("2d")
		cnv.width = w
		cnv.height = h
		return { cnv, ctx }
	}

	static getTile({ id, color, size, rounded = 10, fontSize = 32, fontFamily = STYLE.FONT_FAMILY.BASE }) {
		const { cnv, ctx } = this.createCanvas(size, size)
		const fillPath2D = Helper.getPath2DRoundRect(1, 1, size-2, size-2, rounded)
		const strokePath2D = Helper.getPath2DRoundRect(2, 2, size-4, size-4, rounded)
		const fillStyle = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/1.5)
		fillStyle.addColorStop(0.6, 'rgba(0,0,0,0)')
		fillStyle.addColorStop(1, 'rgba(0,0,0,0.15)')

		ctx.fillStyle = color
		ctx.fill(fillPath2D)

		ctx.fillStyle = fillStyle
		ctx.fill(fillPath2D)

		ctx.strokeStyle = 'rgba(0,0,0,0.4)'
		ctx.lineWidth = 2
		ctx.stroke(strokePath2D)

		ctx.font = `${ fontSize }px ${ fontFamily }`
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'

		ctx.shadowBlur = 15
		ctx.shadowColor = '#fff'
		ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'
		ctx.fillText(id, size/2, size/2+3)

		return cnv
	}

	static getTileSuper(name, props) {
		if (name === 'mixed') {
			return this.getTileSuperMixed(props)
		}

		if (name === 'bomb') {
			return this.getTileSuperBomb(props)
		}
	}

	static getTileSuperMixed({ size, rounded = 10, fontSize = 42, fontFamily = STYLE.FONT_FAMILY.BASE }) {
		const { cnv, ctx } = this.createCanvas(size, size)
		const fillPath2D = Helper.getPath2DRoundRect(1, 1, size-2, size-2, rounded)
		const strokePath2D = Helper.getPath2DRoundRect(2, 2, size-4, size-4, rounded)
		const fillStyle = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/1.5)
		fillStyle.addColorStop(0.6, 'rgba(0,0,0,0)')
		fillStyle.addColorStop(1, 'rgba(0,0,0,0.15)')

		ctx.fillStyle = TILES.GET_BY_NAME('mixed').COLOR
		ctx.fill(fillPath2D)

		ctx.fillStyle = fillStyle
		ctx.fill(fillPath2D)

		ctx.strokeStyle = 'rgba(0,0,0,0.4)'
		ctx.lineWidth = 2
		ctx.stroke(strokePath2D)

		ctx.font = `${ fontSize }px ${ fontFamily }`
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'

		ctx.shadowBlur = 15
		ctx.shadowColor = '#fff'
		ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
		ctx.fillText('+', size/2, size/2+1)

		return cnv
	}

	static getTileSuperBomb({ size, rounded = 10, fontSize = 38, fontFamily = STYLE.FONT_FAMILY.BASE }) {
		const { cnv, ctx } = this.createCanvas(size, size)
		const fillPath2D = Helper.getPath2DRoundRect(1, 1, size-2, size-2, rounded)
		const strokePath2D = Helper.getPath2DRoundRect(2, 2, size-4, size-4, rounded)
		const fillStyle = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/1.5)
		fillStyle.addColorStop(0.6, 'rgba(0,0,0,0)')
		fillStyle.addColorStop(1, 'rgba(0,0,0,0.15)')

		ctx.fillStyle = TILES.GET_BY_NAME('bomb').COLOR
		ctx.fill(fillPath2D)

		ctx.fillStyle = fillStyle
		ctx.fill(fillPath2D)

		ctx.strokeStyle = 'rgba(0,0,0,0.4)'
		ctx.lineWidth = 2
		ctx.stroke(strokePath2D)

		ctx.font = `${ fontSize }px ${ fontFamily }`
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'

		ctx.shadowBlur = 25
		ctx.shadowColor = '#000'
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
		ctx.fillText('×', size/2, size/2+1)

		return cnv
	}

	static getField({ rows, cols, cellSize, cellColor, cellRound = 6 }) {
		const { cnv, ctx } = this.createCanvas(cellSize * cols + 4, cellSize * rows + 4)
		const pathOffset = 1

		ctx.fillStyle = cellColor
		ctx.shadowBlur = 4
		ctx.shadowColor = `rgba(0,0,0,0.2)`
		ctx.shadowOffsetX = 2
		ctx.shadowOffsetY = 2

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const path2D = Helper.getPath2DRoundRect(
					cellSize * j + pathOffset,
					cellSize * i + pathOffset,
					cellSize - pathOffset * 2,
					cellSize - pathOffset * 2,
					cellRound
				)

				ctx.fill(path2D)
			}
		}

		return cnv
	}

	static getFigure({ pattern, tileName, tileSize }) {
		const { cnv, ctx } = this.createCanvas(tileSize * pattern.length+4, tileSize * pattern.length+4)
		ctx.translate(2,2)

		for (let row = 0; row < pattern.length; row++) {
			for (let col = 0; col < pattern[0].length; col++) {
				if (pattern[row][col] === '0') {
					continue
				}

				ctx.drawImage(app.resources.tiles[tileName], -2 + (tileSize * col), -2 + (tileSize * row))
			}
		}

		return cnv
	}
}