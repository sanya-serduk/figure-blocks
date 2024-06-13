import Tile from "../../../entities/Tile";
import FIGURES from "../../../constants/FIGURES";
import Helper from "../../../system/Helper";
import TILES from "../../../constants/TILES";
import ScoreParticle from "../../../entities/ScoreParticle";
import STYLE from "../../../constants/STYLE";
import HelperVisual from "../../../system/HelperVisual";
import GameTrainingLayer from "./GameTrainingLayer";

export default class GameLayer {
	constructor(ctx, scene, { isContinue = false } = {}) {
		this.ctx = ctx
		this.scene = scene
		this.tiles = []
		this.scoreParticles = []
		this.numRows = 13
		this.numCols = 9
		this.field = Helper.getGridArray(this.numRows, this.numCols, '0')
		this.tileSize = 78
		this.w = this.tileSize * this.field[0].length
		this.h = this.tileSize * this.field.length
		this.x = -(this.w / 2)
		this.y = -app.size.h/2 + 90
		this.tileCurrent = null
		this.nextTile = null
		this.prevBoost = {
			state: 0,
			tile: this.tileCurrent
		}
		this.timeoutSuperTile = 0
		this.skinField = HelperVisual.getField({
			rows: this.numRows,
			cols: this.numCols,
			cellSize: this.tileSize,
			cellColor: STYLE.COLOR.BASE_LIGHT
		})
		this.gameTraining = null
		this.initBase()
		isContinue ? this.initSavedGame() : this.initNewGame()
	}

	initBase() {
		this.setTimeoutSuperTile()
	}

	initNewGame() {
		app.user.setGameSave()
		app.user.resetScore()

		if (!app.user.training) {
			this.gameTraining = new GameTrainingLayer(this.ctx, this.scene, this)
		}
	}

	initSavedGame() {
		if (!app.user.game) {
			this.initNewGame()
			return
		}

		const gameData = app.user.game.split('|')
		this.field = Helper.stringToGridArray(gameData[0])
		this.nextTile = gameData[1]
		app.user.setScore(gameData[2])

		for (let row = 0; row < this.field.length; row++) {
			for (let col = 0; col < this.field[0].length; col++) {
				if (this.field[row][col] === '0') {
					continue
				}

				const TILE_TEMPLATE = TILES.GET_BY_ID(this.field[row][col])
				this.tiles.push(new Tile(this.ctx, {
					x: col * this.tileSize,
					y: row * this.tileSize,
					size: this.tileSize,
					id: TILE_TEMPLATE.ID,
					name: TILE_TEMPLATE.NAME,
					row, col
				}))
			}
		}
	}

	gameSave() {
		const strField = Helper.gridArrayToString(this.field)
		const strData = `${ strField }|${ this.tileCurrent.id }|${ app.user.score }`
		app.user.setGameSave(strData)
	}

	gameOver() {
		this.scene.openModal('GameOver')
		app.user.setGameSave()
	}

	destroyGameTraining() {
		this.gameTraining.destroy()
		this.gameTraining = null
		app.user.setGameTraining(true)
	}

	reset() {
		this.tiles.forEach(tile => tile.destroy())
		this.field = this.field.map(row => row.map(() => '0'))
		this.tileCurrent = null
		this.nextTile = null
		this.setTimeoutSuperTile()
		app.user.resetScore()
		app.user.setGameSave()
	}

	setTimeoutSuperTile() {
		this.timeoutSuperTile = Helper.getRandomInteger(10, 20)
	}

	getStateControlButton(name) {
		return app.keyboard.getState(name) || app.stateButtons.getState('game_control', name)
	}

	tileGenerate() {
		if (this.tileCurrent !== null) {
			return
		}

		const TILE_TEMPLATE = TILES.GET_BY_ID(this.nextTile) || TILES.SIMPLE[Helper.getRandomInteger(0, TILES.SIMPLE.length-1)]
		this.nextTile = this.timeoutSuperTile === 0
			? TILES.SUPER[Helper.getRandomInteger(0, TILES.SUPER.length-1)].ID
			: TILES.SIMPLE[Helper.getRandomInteger(0, TILES.SIMPLE.length-1)].ID

		const tile = new Tile(this.ctx, {
			x: Math.floor(this.field[0].length/2) * this.tileSize,
			y: -(90 + this.tileSize),
			size: this.tileSize,
			id: TILE_TEMPLATE.ID,
			name: TILE_TEMPLATE.NAME
		})

		this.tiles.push(tile)
		this.tileCurrent = tile

		if (this.timeoutSuperTile >= 1) {
			this.timeoutSuperTile -= 1
		} else {
			this.setTimeoutSuperTile()
		}

		if (this.tiles.length > 1) {
			this.gameSave()
		}
	}

	searchTile(row, col) {
		return this.tiles.find(tile => tile.row === row && tile.col === col)
	}

	getPositionTile(tile) {
		return {
			row: Math.max(Math.ceil((tile.y) / this.tileSize), -1),
			col: Math.ceil((tile.endX) / this.tileSize)
		}
	}

	moveTilesDown() {
		const cellsMoved = []
		for (let row = this.field.length-1; row >= 0; row--) {
			for (let col = this.field[0].length-1; col >= 0; col--) {
				if (this.field[row][col] === '0') {
					continue
				}

				let endRow = row
				while (endRow < this.field.length-1 && this.field[endRow+1][col] === '0') {
					endRow++
				}

				if (row !== endRow) {
					const tile = this.searchTile(row, col)
					this.field[row][col] = '0'
					this.field[endRow][col] = 'X'
					tile.unsetCell()
					tile.speedY = 7
					tile.setPositionY(endRow * this.tileSize)
					cellsMoved.push({
						row: endRow,
						col: col
					})
				}
			}
		}

		cellsMoved.forEach(cell => {
			this.field[cell.row][cell.col] = '0'
		})
	}

	getFigureOnField(row, col, pattern, tileMixedID = null) {
		let id = null
		const cells = []
		for (let pRow = 0; pRow < pattern.length; pRow++) {
			for (let pCol = 0; pCol < pattern[0].length; pCol++) {
				if (pattern[pRow][pCol] === '0') {
					continue
				}

				const cellID = this.field[row + pRow][col + pCol]

				if (cellID === '0') {
					return []
				}

				if (cellID !== tileMixedID || tileMixedID === null) {
					if (id !== null && id !== cellID) {
						return []
					}

					id = cellID
				}

				cells.push({
					row: row + pRow,
					col: col + pCol
				})
			}
		}

		return cells
	}

	clearFiguresOnField() {
		const tileMixedID = TILES.GET_BY_NAME('mixed').ID
		for (const figure of FIGURES) {
			for (let row = 0; row < this.field.length - figure.pattern.length+1; row++) {
				for (let col = 0; col < this.field[0].length - figure.pattern[0].length+1; col++) {
					const figureOnField = this.getFigureOnField(row, col, figure.pattern, tileMixedID)
					figureOnField.forEach(cell => {
						this.field[cell.row][cell.col] = '0'
						const tile = this.searchTile(cell.row, cell.col)
						tile.destroy()
					})

					if (figureOnField.length) {
						app.user.upScore(figure.price)
						const x = (col+2) * this.tileSize - this.tileSize/2
						const y = (row+2) * this.tileSize - this.tileSize/2
						this.scoreParticles.push(new ScoreParticle(this.ctx, x, y, `+${ figure.price }`))
					}
				}
			}
		}
	}

	clearBombOnField() {
		const tileBombID = TILES.GET_BY_NAME('bomb').ID
		const group = [[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1]]
		for (let row = this.field.length-1; row >= 0; row--) {
			for (let col = this.field[0].length-1; col >= 0; col--) {
				if (this.field[row][col] === '0' || this.field[row][col] !== tileBombID) {
					continue
				}

				this.field[row][col] = '0'
				const tile = this.searchTile(row, col)
				tile.destroy()

				for (let i = 0; i < group.length; i++) {
					const R = row+group[i][0]
					const C = col+group[i][1]

					if (this.field?.[R]?.[C]) {
						if (this.field[R][C] !== '0') {
							this.field[R][C] = '0'
							const tile = this.searchTile(R, C)
							tile.destroy()
						}
					}
				}
			}
		}
	}

	getTileBorderY(row, col) {
		return this.field.reduce((sum, row) => row[col] === '0' ? sum + this.tileSize : sum, 0) - this.tileSize
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.drawImage(this.skinField, 0, 0)
		this.tiles.forEach(tile => {
			if (!tile.destroyed) {
				tile.draw()
			}
		})
		this.scoreParticles.forEach(particle => particle.draw())
		this.ctx.restore()

		if (this.gameTraining !== null) {
			this.gameTraining?.draw()
		}
	}

	update(delta) {
		if (this.gameTraining !== null) {
			this.gameTraining.update(delta)
			return
		}

		if (this.tileCurrent !== null && this.tileCurrent.y < 0 && !this.tileCurrent.moved) {
			this.gameOver()
			return
		}

		this.tiles = this.tiles.filter(tile => {
			if (tile.destroyed) {
				return false
			}

			if (!tile.moved && !tile.removed) {
				const { row, col } = this.getPositionTile(tile)
				tile.setCell(row, col)
				this.field[row][col] = tile.id
				if (tile === this.tileCurrent) {
					this.tileCurrent = null
				}
			}

			return true
		})

		if (!this.tiles.find(tile => tile.moved)) {
			this.clearBombOnField()
			this.clearFiguresOnField()
		}

		if (!this.tiles.find(tile => tile.moved || tile.removed)) {
			this.moveTilesDown()
		}

		if (!this.tiles.find(tile => tile.moved || tile.destroyed || tile.removed) && this.tiles.length <= this.field.length * this.field[0].length) {
			this.tileGenerate()
		}

		if (this.tileCurrent !== null) {
			let { row, col } = this.getPositionTile(this.tileCurrent)
			const isEmptyLeftCell = row === -1 ? true : this.field[row][col-1] === '0'
			const isEmptyRightCell = row === -1 ? true : this.field[row][col+1] === '0'
			const left = this.getStateControlButton('left') && col !== 0 && isEmptyLeftCell
			const right = this.getStateControlButton('right') && col < this.field[0].length-1 && isEmptyRightCell

			this.tileCurrent.setMoveX((right - left) * this.tileSize)
			this.tileCurrent.setPositionY(this.getTileBorderY(row, col))

			const downState = this.getStateControlButton('down')

			if (downState) {
				if (this.prevBoost.tile === this.tileCurrent || this.prevBoost.state === 0) {
					this.tileCurrent.setBoostY()
					this.prevBoost.state = downState
					this.prevBoost.tile = this.tileCurrent
				}
			} else {
				this.prevBoost.state = downState
				this.prevBoost.tile = this.tileCurrent
			}
		}

		this.tiles.forEach(tile => tile.update(delta))
		this.scoreParticles = this.scoreParticles.filter(particle => {
			if (particle.destroyed) {
				return false
			}

			particle.update(delta)
			return true
		})
	}
}