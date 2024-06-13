import TILES from "../../../constants/TILES";
import Tile from "../../../entities/Tile";
import TrainingArrow from "../../../entities/TrainingArrow";

export default class GameTrainingLayer {
	constructor(ctx, scene, game) {
		this.ctx = ctx
		this.scene = scene
		this.game = game
		this.arrow = new TrainingArrow(ctx)
		this.step = 0
		this.stepTiles = [
			{ name: 'green', type: 'simple' },
			{ name: 'mixed', type: 'super'  },
			{ name: 'bomb',  type: 'super'  },
		]
		this.init()
	}

	init() {
		const tileCreate = (col, row, name) => ({ name, row: this.game.numRows-row, col: col-1 })
		const tiles = [
			tileCreate(4, 1, 'red'),
			tileCreate(4, 3, 'red'),
			tileCreate(5, 3, 'red'),
			tileCreate(6, 4, 'red'),
			tileCreate(5, 7, 'red'),
			tileCreate(5, 8, 'red'),
			tileCreate(5, 1, 'yellow'),
			tileCreate(4, 2, 'yellow'),
			tileCreate(5, 2, 'yellow'),
			tileCreate(4, 4, 'yellow'),
			tileCreate(3, 1, 'yellow'),
			tileCreate(3, 2, 'yellow'),
			tileCreate(6, 1, 'green'),
			tileCreate(5, 4, 'green'),
			tileCreate(4, 5, 'green'),
			tileCreate(6, 3, 'green'),
			tileCreate(5, 6, 'green'),
			tileCreate(5, 5, 'green'),
			tileCreate(6, 2, 'purple'),
			tileCreate(5, 9, 'purple'),
		]

		tiles.forEach(item => {
			const TILE_TEMPLATE = TILES.GET_BY_NAME(item.name)
			const tile = new Tile(this.ctx, {
				x: item.col * this.game.tileSize,
				y: item.row * this.game.tileSize,
				size: this.game.tileSize,
				id: TILE_TEMPLATE.ID,
				name: TILE_TEMPLATE.NAME
			})

			tile.setCell(item.row, item.col)
			this.game.field[item.row][item.col] = tile.id
			this.game.tiles.push(tile)
		})


		this.scene.headerLayer.setActive(false)
		this.scene.headerLayer.buttons[3].setActive(true)
		this.scene.footerLayer.setActive(false)
		app.keyboard.remove('left')
		app.keyboard.remove('down')
		app.keyboard.remove('right')
		app.keyboard.remove('space')
	}

	destroy() {
		this.scene.headerLayer.setActive(true)
		this.scene.footerLayer.setActive(true)
		app.keyboard.add('down',  ['KeyS', 'ArrowDown'])
		app.keyboard.add('left',  ['KeyA', 'ArrowLeft'])
		app.keyboard.add('right', ['KeyD', 'ArrowRight'])
		app.keyboard.add('space', ['Space'])
	}

	tileGenerate() {
		if (!this.stepTiles.length) {
			this.game.destroyGameTraining()
			return
		}

		const tileStep = this.stepTiles.shift()
		const TILE_TEMPLATE = TILES.GET_BY_NAME(tileStep.name)
		const tile = new Tile(this.ctx, {
			x: Math.floor(this.game.field[0].length/2) * this.game.tileSize,
			y: -(90 + this.game.tileSize),
			size: this.game.tileSize,
			id: TILE_TEMPLATE.ID,
			name: TILE_TEMPLATE.NAME
		})

		tile.speedY = 5
		this.game.tiles.push(tile)
		this.game.tileCurrent = tile
		this.setStep()
	}

	setActiveButton(name, state) {
		this.scene.footerLayer.buttons[name].setActive(state)
	}

	getPositionFooterButton(name) {
		return {
			x: this.scene.footerLayer.x + this.scene.footerLayer.buttons[name].x + app.size.w/6,
			y: this.scene.footerLayer.y + this.scene.footerLayer.buttons[name].y + app.size.w/6,
		}
	}

	setStep() {
		this.step += 1
		this.scene.footerLayer.setActive(false)
		app.keyboard.remove('left')
		app.keyboard.remove('down')
		app.keyboard.remove('right')

		if (this.step === 2 || this.step === 4 || this.step === 5) {
			this.setActiveButton('down', true)
			app.keyboard.add('down', ['KeyS', 'ArrowDown'])
		}

		if (this.step === 3) {
			this.setActiveButton('left', true)
			app.keyboard.add('left', ['KeyA', 'ArrowLeft'])
		}

		if (this.step === 1) {
			this.setActiveButton('right', true)
			app.keyboard.add('right', ['KeyD', 'ArrowRight'])
		}
	}

	draw() {
		if (this.game.tileCurrent === null || this.step === 0) {
			return
		}

		this.ctx.save()

		if (this.step === 2 || this.step === 4 || this.step === 5) {
			const { x, y } = this.getPositionFooterButton('down')
			this.ctx.translate(x, y)
		}

		if (this.step === 3) {
			const { x, y } = this.getPositionFooterButton('left')
			this.ctx.translate(x, y)
		}

		if (this.step === 1) {
			const { x, y } = this.getPositionFooterButton('right')
			this.ctx.translate(x, y)
		}

		this.arrow.draw()
		this.ctx.restore()
	}

	update(delta) {
		this.arrow.update(delta)

		if (this.game.tileCurrent !== null && this.game.tileCurrent.y > -this.game.tileSize) {
			this.game.tileCurrent.speedY = this.game.tileCurrent.speedY > 0.1 ? this.game.tileCurrent.speedY * 0.96 : 0
		}

		this.game.tiles = this.game.tiles.filter(tile => {
			if (tile.destroyed) {
				return false
			}

			if (!tile.moved && !tile.removed) {
				const { row, col } = this.game.getPositionTile(tile)
				tile.setCell(row, col)
				this.game.field[row][col] = tile.id
				if (tile === this.game.tileCurrent) {
					this.game.tileCurrent = null
				}
			}

			return true
		})

		if (!this.game.tiles.find(tile => tile.moved)) {
			this.game.clearBombOnField()
			this.game.clearFiguresOnField()
		}

		if (!this.game.tiles.find(tile => tile.moved || tile.removed)) {
			this.game.moveTilesDown()
		}

		if (!this.game.tiles.find(tile => tile.moved || tile.destroyed || tile.removed)) {
			this.tileGenerate()
		}

		if (this.game.tileCurrent !== null) {
			let { row, col } = this.game.getPositionTile(this.game.tileCurrent)
			const isEmptyLeftCell = row === -1 ? true : this.game.field[row][col-1] === '0'
			const isEmptyRightCell = row === -1 ? true : this.game.field[row][col+1] === '0'
			const left = this.game.getStateControlButton('left') && col !== 0 && isEmptyLeftCell
			const right = this.game.getStateControlButton('right') && col < this.game.field[0].length-1 && isEmptyRightCell

			this.game.tileCurrent.setMoveX((right - left) * this.game.tileSize)
			this.game.tileCurrent.setPositionY(this.game.getTileBorderY(row, col))

			if (this.game.getStateControlButton('down')) {
				this.game.tileCurrent.setBoostY()
			}

			if ((this.step === 1 && right) || (this.step === 3 && left)) {
				this.setStep()
			}
		}

		this.game.tiles.forEach(tile => tile.update(delta))
		this.game.scoreParticles = this.game.scoreParticles.filter(particle => {
			if (particle.destroyed) {
				return false
			}

			particle.update(delta)
			return true
		})
	}
}