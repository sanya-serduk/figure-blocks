import Localstorage from "./Localstorage";
import TEXT from "../constants/TEXT";

export default class User {
	constructor() {
		this.score = 0
		this.record = 0
		this.game = ''
		this.training = false
		this.lang = (navigator.language || navigator.userLanguage) ?? 'ru'
		this.supportedLanguages = ['ru', 'en', 'tr']
		this.db = new Localstorage('figure-blocks__user', {
			record: this.record,
			lang: this.lang,
			game: this.game,
			training: this.training
		})
		this.init()
	}

	init() {
		const storageData = this.db.getData()
		this.record = storageData.record
		this.lang = storageData.lang
		this.game = storageData.game
		this.training = storageData.training
	}

	setStorageData() {
		this.db.setData({
			record: this.record,
			lang: this.lang,
			game: this.game,
			training: true
		})
	}

	setGameSave(data = '') {
		if (this.game === data) {
			return
		}

		this.game = data
		this.setStorageData()
	}

	setGameTraining(state) {
		if (this.training === state) {
			return
		}

		this.training = state
		this.setStorageData()
	}

	upScore(num) {
		this.setScore(this.score + Number(num))
	}

	setScore(score) {
		this.score = Number(score)

		if (this.score > this.record) {
			this.record = this.score
			this.setStorageData()
		}
	}

	resetScore() {
		this.score = 0
	}

	changeLanguage(lang) {
		if (this.supportedLanguages.includes(lang)) {
			this.lang = lang
			document.title = TEXT.TITLE
			this.setStorageData()
		}
	}
}