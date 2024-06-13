import GameHeaderButton from "./GameHeaderButton";
import Helper from "../../system/Helper";

export default class GameHeaderButtonReload extends GameHeaderButton {
	constructor(ctx, props) {
		super(ctx, props)
		this.arrowPath2D = Helper.getPath2DRoundedPolygon([
			{ x: -16,  y: 0  },
			{ x: 16, y: 0 },
			{ x: 0,  y: 15 },
		], 3)
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x+this.w/2+2, this.y+this.h/2)

		if (this.hover) {
			this.ctx.globalAlpha = 0.8
		}

		this.ctx.lineWidth = 4
		this.ctx.lineCap = "round"
		this.ctx.fillStyle = 'rgb(115,97,97)'
		this.ctx.strokeStyle = 'rgb(115,97,97)'

		this.ctx.beginPath()
		this.ctx.arc(0, 0, 20, -Math.PI, Math.PI/2)
		this.ctx.stroke()
		this.ctx.closePath()

		this.ctx.translate(-this.w/2+20, 0)
		this.ctx.fill(this.arrowPath2D)

		this.ctx.restore()
	}
}