export default class GameHeaderButton {
	constructor(ctx, props) {
		this.ctx = ctx
		this.x = props.x || 0
		this.y = props.y || 0
		this.w = props.w
		this.h = props.h
		this.hover = 0
		this.handler = props.handler || (() => {})
		this.clickHandler = this.click.bind(this)
		this.mousemoveHandler = this.mousemove.bind(this)
		this.isActive = props.isActive ?? true
		this.init()
	}

	init() {
		if (this.isActive) {
			this.addListeners()
		}
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
		const x = (e.clientX - b.left) / app.scale
		const y = (e.clientY - b.top) / app.scale
		if (x > this.x
			&& x < this.x + this.w
			&& y > this.y
			&& y < this.y + this.h) {
			this.handler()
		}
	}

	mousemove(e) {
		const b = app.cnv.getBoundingClientRect()
		const x = (e.clientX - b.left) / app.scale
		const y = (e.clientY - b.top) / app.scale
		this.hover = x > this.x
			&& x < this.x + this.w
			&& y > this.y
			&& y < this.y + this.h
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)

		if (this.hover) {
			this.ctx.fillRect(0, 0, this.w, this.h)
		}

		this.ctx.restore()
	}
}