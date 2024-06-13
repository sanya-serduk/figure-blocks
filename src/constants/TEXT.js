function langFormat(lang, obj) {
	return obj.hasOwnProperty(lang) ? obj[lang] : obj[obj.default]
}

export default {
	get TITLE() {
		return langFormat(app.user.lang, {
			ru: 'Фигуры из блоков',
			en: 'Block figures',
			tr: 'Bloklardan şekiller',
			default: 'ru'
		})
	},

	get SCORE() {
		return langFormat(app.user.lang, {
			ru: 'Счёт',
			en: 'Score',
			tr: 'Hesap',
			default: 'ru'
		})
	},

	get RECORD() {
		return langFormat(app.user.lang, {
			ru: 'Рекорд',
			en: 'Record',
			tr: 'Rekor',
			default: 'ru'
		})
	},

	get NEW_GAME() {
		return langFormat(app.user.lang, {
			ru: 'Новая игра',
			en: 'New game',
			tr: 'Yeni oyun',
			default: 'ru'
		})
	},

	get START_OVER() {
		return langFormat(app.user.lang, {
			ru: 'Начать заново',
			en: 'Start over',
			tr: 'Baştan başlamak',
			default: 'ru'
		})
	},

	get GAME_OVER() {
		return langFormat(app.user.lang, {
			ru: 'Конец игры',
			en: 'Game over',
			tr: 'Oyunun sonu',
			default: 'ru'
		})
	},

	get CANCEL() {
		return langFormat(app.user.lang, {
			ru: 'Отмена',
			en: 'Cancel',
			tr: 'İptal',
			default: 'ru'
		})
	},

	get CONTINUE() {
		return langFormat(app.user.lang, {
			ru: 'Продолжить',
			en: 'Continue',
			tr: 'Devam et',
			default: 'ru'
		})
	},

	get BACK() {
		return langFormat(app.user.lang, {
			ru: 'Назад',
			en: 'Back',
			tr: 'Geri',
			default: 'ru'
		})
	},

	get CONTROL() {
		return langFormat(app.user.lang, {
			ru: 'Управление',
			en: 'Control',
			tr: 'Yönetim',
			default: 'ru'
		})
	},

	get HOW_TO_PLAY() {
		return langFormat(app.user.lang, {
			ru: 'Как играть ?',
			en: 'How to play ?',
			tr: 'Nasıl oynanır ?',
			default: 'ru'
		})
	},

	get HOW_TO_PLAY_DESCRIPTION_FIGURES() {
		return langFormat(app.user.lang, {
			ru: 'Собирайте фигуры из блоков\n' +
				'одного цвета\n' +
				'и зарабатывайте очки',
			en: 'Collect shapes from blocks\n' +
				'of the same color and earn\n' +
				'points',
			tr: 'Aynı renkteki bloklardan\n' +
				'şekilleri toplayın ve puan\n' +
				'kazanın',
			default: 'ru'
		})
	},

	get HOW_TO_PLAY_DESCRIPTION_SUPER_TILES() {
		return langFormat(app.user.lang, {
			ru: 'Используйте супер блоки',
			en: 'Use super blocks',
			tr: 'Süper blokları kullanın',
			default: 'ru'
		})
	},

	get EXIT() {
		return langFormat(app.user.lang, {
			ru: 'Выход',
			en: 'Exit',
			tr: 'Çıkış',
			default: 'ru'
		})
	},

	get CONTROL_FROM_PC() {
		return {
			TITLE: langFormat(app.user.lang, {
				ru: 'Управление с ПК:',
				en: 'Control from a PC:',
				tr: 'PC\'den kontrol:',
				default: 'ru'
			}),
			ITEMS: [
				langFormat(app.user.lang, {
					ru: '- Перемещение блока: WASD,\n' +
						'  стрелки или экранные кнопки',
					en: '- Moving the block: WASD,\n' +
						'  arrows or on-screen buttons',
					tr: '- Blok hareketi: WASD, oklar\n' +
						'  veya ekran düğmeleri',
					default: 'ru'
				}),
				langFormat(app.user.lang, {
					ru: '- Пауза: пробел',
					en: '- Pause: Space',
					tr: '- Duraklat: Boşluk çubuğu',
					default: 'ru'
				})
			]
		}
	},

	get CONTROL_FROM_MOBILE() {
		return {
			TITLE: langFormat(app.user.lang, {
				ru: 'Управление с мобильного:',
				en: 'Mobile control:',
				tr: 'Mobil cihazdan kontrol:',
				default: 'ru'
			}),
			ITEMS: [
				langFormat(app.user.lang, {
					ru: '- Перемещение блока: экранные\n' +
						'  кнопки в виде стрелок',
					en: '- Moving the block: on-screen\n' +
						'  buttons in the form of arrows',
					tr: '- Bloğu taşıma: Ok şeklinde\n' +
						'  ekran düğmeleri',
					default: 'ru'
				}),
			]
		}
	},

	get CLOSE() {
		return langFormat(app.user.lang, {
			ru: 'Закрыть',
			en: 'Close',
			tr: 'Kapat',
			default: 'ru'
		})
	},

	get POINTS() {
		return langFormat(app.user.lang, {
			ru: 'очков',
			en: 'points',
			tr: 'puan',
			default: 'ru'
		})
	},

	get MIXED() {
		return langFormat(app.user.lang, {
			ru: 'Смешанный',
			en: 'Mixed',
			tr: 'Karışık',
			default: 'ru'
		})
	},

	get TILE_MIXED_DESC() {
		return langFormat(app.user.lang, {
			ru: 'Заменяет блок любого цвета',
			en: 'Replaces a block of any color',
			tr: 'Herhangi bir üniteyi değiştirir',
			default: 'ru'
		})
	},

	get DESTROYER() {
		return langFormat(app.user.lang, {
			ru: 'Разрушитель',
			en: 'Destroyer',
			tr: 'Yıkıcı',
			default: 'ru'
		})
	},

	get TILE_DESTROYER_DESC() {
		return langFormat(app.user.lang, {
			ru: 'Удаляет блоки вокруг себя',
			en: 'Removes blocks around itself',
			tr: 'Etrafındaki blokları kaldırır',
			default: 'ru'
		})
	},
}