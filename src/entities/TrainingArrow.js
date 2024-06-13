import Helper from "../system/Helper";

export default class TrainingArrow {
	constructor(ctx) {
		this.ctx = ctx
		this.y = 0
		this.amplitude = 25
		this.frequency = 0.1
		this.time = 0
		this.arrowPath2D = Helper.getPath2DRoundedPolygon([
			{ x: -50, y: 60  },
			{ x: -25, y: 60  },
			{ x: -25, y: 0   },
			{ x: 25,  y: 0   },
			{ x: 25,  y: 60  },
			{ x: 50,  y: 60  },
			{ x: 0,   y: 120 },
		], 4)
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(0, this.y-200)
		this.ctx.shadowBlur = 4
		this.ctx.shadowOffsetX = 2
		this.ctx.shadowOffsetY = 2
		this.ctx.shadowColor = `rgba(0,0,0,0.4)`
		this.ctx.lineWidth = 1
		this.ctx.fillStyle = '#fff'
		this.ctx.strokeStyle = `rgba(0,0,0,0.4)`
		this.ctx.fill(this.arrowPath2D)
		this.ctx.stroke(this.arrowPath2D)
		this.ctx.restore()
	}

	update(delta) {
		this.time += 1 * delta
		this.time %= 2 * Math.PI / this.frequency
		this.y = this.amplitude * Math.sin(this.frequency * this.time)
	}
}