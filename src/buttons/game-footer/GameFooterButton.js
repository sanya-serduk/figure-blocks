import Helper from "../../system/Helper";

export default class GameFooterButton {
	constructor(ctx, props) {
		this.ctx = ctx
		this.x = props.x || 0
		this.y = props.y || 0
		this.w = props.w
		this.h = props.h
		this.hover = 0
		this.isActive = props.isActive ?? true
		this.type = props.type || 'game_control'
		this.name = props.name || 'game_control'
		this.state = 0
		this.touchID = null
		this.handlerTouchStart = this.touchStart.bind(this)
		this.handlerTouchEnd = this.touchEnd.bind(this)
		this.mousedownHandler = this.mousedown.bind(this)
		this.mouseupHandler = this.mouseup.bind(this)
		this.mousemoveHandler = this.mousemove.bind(this)
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

	setState(state) {
		this.state = state

		if (Helper.isTouchDevice) {
			this.hover = state
		}

		app.stateButtons.setState(this.type, this.name, state)
	}

	setActive(bool) {
		this.isActive = bool
		this.isActive ? this.addListeners() : this.removeListeners()
		this.setState(false)
	}

	addListeners() {
		app.cnv.addEventListener('touchstart', this.handlerTouchStart)
		app.cnv.addEventListener('touchend', this.handlerTouchEnd)
		app.cnv.addEventListener('mousedown', this.mousedownHandler)
		app.cnv.addEventListener('mouseup', this.mouseupHandler)
		window.addEventListener('mousemove', this.mousemoveHandler)
	}

	removeListeners() {
		app.cnv.removeEventListener('touchstart', this.handlerTouchStart)
		app.cnv.removeEventListener('touchend', this.handlerTouchEnd)
		app.cnv.removeEventListener('mousedown', this.mousedownHandler)
		app.cnv.removeEventListener('mouseup', this.mouseupHandler)
		window.removeEventListener('mousemove', this.mousemoveHandler)
		this.hover = 0
	}

	touchStart(e) {
		if (this.touchID !== null) {
			return
		}

		const b = app.cnv.getBoundingClientRect()

		for (const key in e.touches) {
			const x = (e.touches[key].clientX - b.left) / app.scale
			const y = (e.touches[key].clientY - b.top) / app.scale - (app.size.h / 2)
			if (x > this.x
				&& x < this.x + this.w
				&& y > this.y
				&& y < this.y + this.h) {
				this.setState(1)
				this.touchID = e.touches[key].identifier
				return
			}
		}
	}

	touchEnd(e) {
		for (const key in e.changedTouches) {
			if (e.changedTouches[key].identifier === this.touchID) {
				this.setState(0)
				this.touchID = null
				return
			}
		}
	}

	mousedown(e) {
		const b = app.cnv.getBoundingClientRect()
		const x = (e.clientX - b.left) / app.scale
		const y = (e.clientY - b.top) / app.scale - (app.size.h / 2)
		if (x > this.x
			&& x < this.x + this.w
			&& y > this.y
			&& y < this.y + this.h) {
			this.setState(1)
		}
	}

	mouseup() {
		this.setState(0)
	}

	mousemove(e) {
		const b = app.cnv.getBoundingClientRect()
		const x = (e.clientX - b.left) / app.scale
		const y = (e.clientY - b.top) / app.scale - (app.size.h / 2)
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