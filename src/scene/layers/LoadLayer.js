export default class LoadLayer {
	constructor() {
		this.isLoaded = false
		this.timeout = 100
		this.loadedCallback = null
		this.loadLayer = document.getElementById('load-layer')
		this.loadLayer.classList.remove('hide', 'none')
		this.handlerTransitionend = this.transitionend.bind(this)
		this.loadLayer.addEventListener('transitionend', this.handlerTransitionend)
	}

	destroy() {
		this.loadLayer.removeEventListener('transitionend', this.handlerTransitionend)
		this.loadLayer = null
		this.loadedCallback = null
	}

	transitionend() {
		this.loadLayer.classList.add('none')
		app.scene.removeLayer('Load')
	}

	loaded(callback = null) {
		this.loadedCallback = callback
		this.isLoaded = true
	}

	update(delta) {
		if (this.isLoaded && !this.timeout) {
			if (this.loadedCallback !== null) {
				this.loadedCallback()
				this.loadedCallback = null
			}

			this.loadLayer.classList.add('hide')
			return
		}

		this.timeout = Math.max(this.timeout - 1 * delta, 0)
	}
}