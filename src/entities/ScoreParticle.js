export default class ScoreParticle {
	constructor(ctx, x, y, num) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.num = num
		this.alpha = 1
		this.destroyed = false
		this.timeout = 30
		this.speed = 2
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)

		this.ctx.globalAlpha = this.alpha
		this.ctx.shadowBlur = 4
		this.ctx.shadowColor = `rgba(0,0,0,${ this.alpha })`
		this.ctx.shadowOffsetX = 2
		this.ctx.shadowOffsetY = 2
		this.ctx.fillStyle = '#fff'
		this.ctx.font = 'bold 36px Balsamiq Sans'
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'middle'
		this.ctx.fillText(this.num, 0, 0)

		this.ctx.restore()
	}

	update(delta) {
		if (this.destroyed) {
			return
		}

		if (this.alpha <= 0) {
			this.destroyed = true
			return
		}

		if (this.timeout > 0) {
			this.timeout -= 1 * delta
		} else {
			this.alpha = Math.max(this.alpha - 0.02 * delta, 0)
		}


		this.y -= this.speed * delta
	}
}