export default class Tile {
	constructor(ctx, props) {
		this.ctx = ctx
		this.x = props.x || 0
		this.y = props.y || 0
		this.size = props.size || 70
		this.id = props.id || '0'
		this.color = props.color || '#fff'
		this.row = props.row || null
		this.col = props.col || null
		this.skin = app.resources.tiles[props.name]
		this.speedX = 8
		this.speedY = 1
		this.destroyed = false
		this.removed = false
		this.scale = 1
		this.moved = false
		this.boostY = 0
		this.endX = this.x
		this.endY = this.y
		this.timeuotY = 0
	}

	setCell(row, col) {
		this.row = row
		this.col = col
	}

	unsetCell() {
		this.row = null
		this.col = null
	}

	destroy() {
		this.removed = true
		this.row = null
		this.col = null
	}

	setPositionY(y, timeout = 0) {
		this.endY = y
		this.moved = true
		this.timeuotY = timeout
	}

	setMoveX(x) {
		if (x !== 0 && this.x === this.endX) {
			this.endX = this.x + x
			this.moved = true
		}
	}

	setBoostY(num = 10) {
		this.boostY = num
	}

	draw() {
		this.ctx.save()
		const offset = (this.size - this.size * this.scale) / 2
		this.ctx.translate(this.x + offset, this.y + offset)
		this.ctx.scale(this.scale, this.scale)
		this.ctx.globalAlpha = this.scale
		this.ctx.drawImage(this.skin, -2, -2)
		this.ctx.restore()
	}

	update(delta) {
		if (this.destroyed) {
			return
		}

		if (this.removed) {
			if (this.scale <= 0) {
				this.destroyed = true
			}

			this.scale = Math.max(this.scale - 0.05 * delta, 0)
		}

		if (this.y !== this.endY) {
			if (this.timeuotY > 0) {
				this.timeuotY = Math.max(this.timeuotY - 1 * delta, 0)
			} else {
				let speed = (this.speedY + this.boostY) * delta
				this.y = (this.y + speed < this.endY) ? this.y + speed : this.endY
			}
		}

		if (this.x !== this.endX) {
			const speedX = this.speedX * delta
			const moveX = this.endX - this.x
			if (Math.abs(moveX) > speedX) {
				const speed = speedX * Math.sign(moveX)
				this.x += speed
			} else {
				this.x = this.endX
			}
		}

		if (this.x === this.endX && this.y === this.endY) {
			this.moved = false
		}

		this.boostY = 0
	}
}