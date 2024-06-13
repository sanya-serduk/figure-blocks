export default class ScrollSystem {
	constructor(object) {
		this.object = object
		this.handlerWheel = this.wheel.bind(this)
		this.handlerTouchstart = this.touchstart.bind(this)
		this.handlerTouchmove = this.touchmove.bind(this)
		this.handlerTouchend = this.touchend.bind(this)
		this.touchstartPoint = { x:0, y:0 }
		this.inert = { x:0, y:0 }
		this.tempInert = { x:0, y:0 }
		this.startTime = performance.now()
		this.init()
	}

	init() {
		window.addEventListener('wheel', this.handlerWheel)
		window.addEventListener('touchstart', this.handlerTouchstart)
		window.addEventListener('touchmove', this.handlerTouchmove)
		window.addEventListener('touchend', this.handlerTouchend)
	}

	destroy() {
		window.removeEventListener('wheel', this.handlerWheel)
		window.removeEventListener('touchstart', this.handlerTouchstart)
		window.removeEventListener('touchmove', this.handlerTouchmove)
		window.removeEventListener('touchend', this.handlerTouchend)
	}

	wheel(e) {
		this.object.y = Math.max(Math.min(this.object.y - e.deltaY, 0), -this.object.h)
	}

	touchstart(e) {
		this.touchstartPoint.x = e.touches[0].pageX
		this.touchstartPoint.y = e.touches[0].pageY
		this.inert.x = 0
		this.inert.y = 0
		this.tempInert.x = 0
		this.tempInert.y = 0
		this.startTime = performance.now()
	}

	touchmove(e) {
		const stepY = e.touches[0].pageY - this.touchstartPoint.y
		const elapsedTime = performance.now() - this.startTime
		const moveY = stepY / app.scale
		this.tempInert.y = 30 * (stepY / elapsedTime)
		this.touchstartPoint.y = e.touches[0].pageY
		this.object.y = Math.max(Math.min(this.object.y + (moveY), 0), -this.object.h)
		this.startTime = performance.now()
	}

	touchend(e) {
		this.inert.y = this.tempInert.y
		this.touchstartPoint.x = 0
		this.touchstartPoint.y = 0
		this.tempInert.x = 0
		this.tempInert.y = 0
	}

	update(delta) {
		if (Math.abs(this.inert.y) > 0.1) {
			this.object.y = Math.max(Math.min(this.object.y + this.inert.y, 0), -this.object.h)
			this.inert.y *= 0.95
		} else {
			this.inert.y = 0
		}
	}
}