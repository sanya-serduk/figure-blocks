import Ticker from "./system/Ticker";
import Keyboard from "./system/Keyboard";
import SceneManager from "./system/SceneManager";
import ScaleManager from "./system/ScaleManager";
import User from "./system/User";
import StateButtons from "./system/StateButtons";

export default class App {
	constructor(cnv) {
		this.cnv = cnv
		this.ctx = cnv.getContext("2d")
		this.scaleManager = new ScaleManager(cnv, 720, 1280)
		this.ticker = new Ticker()
		this.keyboard = new Keyboard()
		this.scene = new SceneManager(this.ctx)
		this.user = new User()
		this.stateButtons = new StateButtons()
		this.resources = {
			tiles: {}
		}
		this.init()
	}

	init() {
		this.ticker.add('app-update', this.update.bind(this))
	}

	get scale() {
		return this.scaleManager.scale
	}

	get size() {
		return this.scaleManager.size
	}

	update(delta) {
		this.scene.update(delta)
		this.ctx.setTransform(this.scale, 0, 0, this.scale, 0, 0)
		this.ctx.clearRect(0, 0, this.size.w, this.size.h)
		this.ctx.translate(this.size.w/2, this.size.h/2)
		this.scene.draw()
	}
}