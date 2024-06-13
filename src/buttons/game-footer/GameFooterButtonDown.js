import Helper from "../../system/Helper";
import GameFooterButton from "./GameFooterButton";

export default class GameFooterButtonDown extends GameFooterButton {
	constructor(ctx, props) {
		super(ctx, props)
		this.arrowPath2D = Helper.getPath2DRoundedPolygon([
			{ x: -80, y: 0  },
			{ x:  80, y: 0 },
			{ x:  0,  y: 100 },
		], 6)
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x+this.w/2, this.y+this.h/2-50)
		this.ctx.shadowBlur = 4
		this.ctx.shadowColor = `rgba(0,0,0,0.2)`
		this.ctx.shadowOffsetX = 2
		this.ctx.shadowOffsetY = 2
		this.ctx.fillStyle = this.hover ? '#f3e9e7' : '#eee1dd'
		this.ctx.fill(this.arrowPath2D)
		this.ctx.restore()
	}
}