import GameHeaderButton from "./GameHeaderButton";
import Helper from "../../system/Helper";

export default class GameHeaderButtonHome extends GameHeaderButton {
	constructor(ctx, props) {
		super(ctx, props)
		this.homePath2D = Helper.getPath2DRoundedPolygon([
			{ x:  0,  y: -22 },
			{ x:  20, y: -5  },
			{ x:  20, y:  22 },
			{ x: -20, y:  22 },
			{ x: -20, y: -5  },
		], 4)
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x+this.w/2, this.y+this.h/2)

		if (this.hover) {
			this.ctx.globalAlpha = 0.8
		}

		this.ctx.lineWidth = 4
		this.ctx.strokeStyle = 'rgb(115,97,97)'
		this.ctx.stroke(this.homePath2D)

		this.ctx.restore()
	}
}