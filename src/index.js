import './index.css'
import App from "./App";
import Main from "./scene/Main";
import LoadLayer from "./scene/layers/LoadLayer";
import Game from "./scene/Game";
import About from "./scene/About";
import Control from "./scene/Control";
import HelperVisual from "./system/HelperVisual";
import TILES from "./constants/TILES";
import TEXT from "./constants/TEXT";

window.app = new App(document.getElementById('cnv'))
app.scene.add('Main', Main)
app.scene.add('About', About)
app.scene.add('Control', Control)
app.scene.add('Game', Game)
app.scene.addLayer('Load', LoadLayer)
document.title = TEXT.TITLE

function startGame() {
	app.scene.start('Main', { isActive: false })
	app.scene.getLayer('Load').loaded(() => app.scene.current.setActive(true))
}

function tilesInit() {
	TILES.SIMPLE.forEach(tile => {
		app.resources.tiles[tile.NAME] = HelperVisual.getTile({ id: tile.ID, size: 82, color: tile.COLOR })
	})

	TILES.SUPER.forEach(tile => {
		app.resources.tiles[tile.NAME] = HelperVisual.getTileSuper(tile.NAME, { size: 82 })
	})
}

async function loadFont() {
	try {
		const font = new FontFace("Balsamiq Sans", "url(./assets/fonts/BalsamiqSans-Regular.ttf)")
		await font.load()
		document.fonts.add(font)
	} catch (e) {
		console.error(e)
	}
}

async function loadBackImage() {
	try {
		const computedStyle = window.getComputedStyle(document.body)
		const backgroundImage = computedStyle.getPropertyValue('background-image')
		const imageUrl = backgroundImage.match(/url\("?(.+?)"?\)/)[1]
		await loadImage(imageUrl)
	} catch (e) {
		console.error(e)
	}
}

function loadImage(url) {
	return new Promise((resolve, reject) => {
		const image = new Image()
		image.src = url
		image.onload = () => resolve(image)
		image.onerror = (error) => reject(new Error(`Failed to load image at ${ url }: ${ error }`))
	})
}

(async function() {
	await loadBackImage()
	await loadFont()
	tilesInit()
	startGame()
})()