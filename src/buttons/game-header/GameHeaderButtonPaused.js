import GameHeaderButton from "./GameHeaderButton";
import Helper from "../../system/Helper";

export default class GameHeaderButtonPaused extends GameHeaderButton {
	constructor(ctx, props) {
		super(ctx, props)
		this.scene = props.scene
		this.playPath2D = Helper.getPath2DRoundedPolygon([
			{ x: 0,  y: 0  },
			{ x: 40, y: 25 },
			{ x: 0,  y: 50 },
		], 4)
		this.pausePath2D = Helper.getPath2DRoundRect(0, 0, 14, 44, 4)
	}

	draw() {
		this.ctx.save()
		if (this.hover) {
			this.ctx.globalAlpha = 0.8
		}

		this.ctx.fillStyle = `rgb(115,97,97)`

		if (this.scene.paused) {
			this.ctx.translate(this.x+21, this.y+20)
			this.ctx.fill(this.playPath2D)
		} else {
			this.ctx.translate(this.x+19, this.y+23)
			this.ctx.fill(this.pausePath2D)
			this.ctx.translate(24, 0)
			this.ctx.fill(this.pausePath2D)
		}
		this.ctx.restore()
	}
}