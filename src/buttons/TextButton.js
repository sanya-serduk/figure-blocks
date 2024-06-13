import Helper from "../system/Helper";
import STYLE from "../constants/STYLE";

export default class TextButton {
	constructor(ctx, props) {
		this.ctx = ctx
		this.x = props.x || 0
		this.y = props.y || 0
		this.offsetX = props.offsetX || 0
		this.offsetY = props.offsetY || 0
		this.isActive = props.isActive ?? true
		this.fz = 52
		this.w = 0
		this.h = this.fz * 2 + 20
		this.dark = props.dark || false
		this.color = this.dark ? 'rgb(115,97,97)' : '#eee1dd'
		this.colorHover = this.dark ? 'rgb(108,90,90)' : '#f3e9e7'
		this.textColor = this.dark ? '#eee1dd' : 'rgb(115,97,97)'
		this.text = `${ props.text || 'button' }`
		this.font = `${ this.fz }px ${ STYLE.FONT_FAMILY.BASE }`
		this.hover = 0
		this.handler = props.handler || (() => {})
		this.clickHandler = this.click.bind(this)
		this.mousemoveHandler = this.mousemove.bind(this)
		this.isActive = props.isActive ?? true
		this.path2D = new Path2D()
		this.init()

		if (this.isActive) {
			this.addListeners()
		}
	}

	init() {
		this.ctx.save()
		this.ctx.font = this.font
		const textMetric = this.ctx.measureText(this.text)
		this.w = textMetric.width + this.h
		this.ctx.restore()
		this.path2D = Helper.getPath2DRoundRect(0,0,this.w,this.h, 30)
	}

	destroy() {
		this.removeListeners()
	}

	setActive(bool) {
		this.isActive = bool
		this.isActive ? this.addListeners() : this.removeListeners()
	}

	addListeners() {
		app.cnv.addEventListener('click', this.clickHandler)
		window.addEventListener('mousemove', this.mousemoveHandler)
	}

	removeListeners() {
		app.cnv.removeEventListener('click', this.clickHandler)
		window.removeEventListener('mousemove', this.mousemoveHandler)
		this.hover = 0
	}

	click(e) {
		const b = app.cnv.getBoundingClientRect()
		const x = (e.clientX - b.left) / app.scale - (app.size.w / 2)
		const y = (e.clientY - b.top) / app.scale - (app.size.h / 2)
		if (x > this.x - this.w/2
			&& x < this.x + this.w/2
			&& y > this.y - this.h/2
			&& y < this.y + this.h/2) {
			this.handler()
		}
	}

	mousemove(e) {
		const b = app.cnv.getBoundingClientRect()
		const x = (e.clientX - b.x) / app.scale - (app.size.w / 2)
		const y = (e.clientY +this.offsetY - b.y) / app.scale - (app.size.h / 2)
		this.hover = x > this.x - this.w/2
			&& x < this.x + this.w/2
			&& y > this.y - this.h/2
			&& y < this.y + this.h/2
	}

	updatePosition(x, y) {
		this.x = x
		this.y = y
	}

	setOffset(x, y) {
		this.offsetX = x
		this.offsetY = y
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x-this.w/2, this.y-this.h/2)

		this.ctx.shadowBlur = 4
		this.ctx.shadowColor = `rgba(0,0,0,0.2)`
		this.ctx.shadowOffsetX = 2
		this.ctx.shadowOffsetY = 2
		this.ctx.fillStyle = this.hover ? this.colorHover  : this.color
		this.ctx.fill(this.path2D)

		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'middle'
		this.ctx.fillStyle = this.textColor
		this.ctx.font = this.font
		this.ctx.fillText(this.text, this.w/2, this.h/2+5)

		this.ctx.restore()
	}
}