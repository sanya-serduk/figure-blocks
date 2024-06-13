export default class FigureManager {
	constructor() {
		this._figures = []
	}

	add(price, pattern, rotations = 1) {
		const rows = pattern.length
		const cols = pattern[0].length

		for (let rotation = 0; rotation < rotations; rotation++) {
			const rotatedPattern = []

			for (let i = 0; i < rows; i++) {
				rotatedPattern.push([])
				for (let j = 0; j < cols; j++) {
					if (rotation === 0) {
						rotatedPattern[i][j] = pattern[i][j]
					} else if (rotation === 1) {
						rotatedPattern[i][j] = pattern[cols-1-j][i]
					} else if (rotation === 2) {
						rotatedPattern[i][j] = pattern[rows-1-i][cols-1-j]
					} else if (rotation === 3) {
						rotatedPattern[i][j] = pattern[j][rows-1-i]
					}
				}
			}

			this._figures.push({ price, pattern: rotatedPattern })
		}

		this._figures.sort((a, b) => b.price - a.price)
	}

	get figures() {
		return JSON.parse(JSON.stringify(this._figures))
	}
}