import GameHeaderButton from "./GameHeaderButton";

export default class GameHeaderButtonInfo extends GameHeaderButton {
	constructor(ctx, props) {
		super(ctx, props)
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x+this.w/2, this.y+this.h/2)
		if (this.hover) {
			this.ctx.globalAlpha = 0.8
		}

		this.ctx.lineWidth = 4
		this.ctx.font = 'bold 32px Balsamiq Sans'
		this.ctx.fillStyle = 'rgb(115,97,97)'
		this.ctx.strokeStyle = 'rgb(115,97,97)'
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'middle'
		this.ctx.fillText(`?`, 0, 4)

		this.ctx.beginPath()
		this.ctx.arc(0,0,23,0,Math.PI*2)
		this.ctx.stroke()

		this.ctx.restore()
	}
}