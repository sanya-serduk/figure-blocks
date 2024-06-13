import GameLayer from "./layers/game/GameLayer";
import GameHeaderLayer from "./layers/game/GameHeaderLayer";
import GameFooterLayer from "./layers/game/GameFooterLayer";
import LayerManager from "../system/LayerManager";
import GameReloadLayer from "./layers/game/GameReloadLayer";
import GameOverLayer from "./layers/game/GameOverLayer";
import GameInfoLayer from "./layers/game/GameInfoLayer";

export default class Game {
	constructor(ctx, props) {
		this.ctx = ctx
		this.paused = false
		this.headerLayer = new GameHeaderLayer(ctx, this)
		this.footerLayer = new GameFooterLayer(ctx, this)
		this.gameLayer = new GameLayer(ctx, this, props)
		this.layer = new LayerManager(ctx)
		this.isShowBaseLayers = true
		this.init()
	}

	init() {
		app.keyboard.addListener('paused', 'keydown', 'space', this.setPaused.bind(this))
		this.layer.add('Reload', GameReloadLayer)
		this.layer.add('GameOver', GameOverLayer)
		this.layer.add('Info', GameInfoLayer)
	}

	destroy() {
		app.keyboard.removeListener('paused')
		app.cnv.style.cursor = ''
		this.headerLayer.destroy()
		this.footerLayer.destroy()
		this.layer.stop()
	}

	openModal(name, isShowBaseLayers = this.isShowBaseLayers) {
		this.setPaused(true)
		this.layer.start(name, this)
		this.headerLayer.setActive(false)
		this.footerLayer.setActive(false)
		this.isShowBaseLayers = isShowBaseLayers
	}

	closeModal() {
		this.setPaused(false)
		this.layer.stop()
		this.headerLayer.setActive(true)
		this.footerLayer.setActive(true)
		this.isShowBaseLayers = true
	}

	reload() {
		this.closeModal()
		this.gameLayer.reset()
	}

	setPaused(state = !this.paused) {
		this.paused = state
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(0, 0)

		if (this.isShowBaseLayers) {
			this.headerLayer.draw()
			this.footerLayer.draw()
			this.gameLayer.draw()
		}

		this.layer.draw()
		this.ctx.restore()
	}

	update(delta) {
		this.headerLayer.update(delta)
		this.footerLayer.update(delta)
		if (!this.paused) {
			this.gameLayer.update(delta)
		}
		this.layer.update(delta)

		const layerButtonHover = this.layer.current !== null ? this.layer.current.buttonHover : false
		app.cnv.style.cursor = this.headerLayer.buttonHover || this.footerLayer.buttonHover || layerButtonHover ? 'pointer' : 'initial'
	}
}