class Tiles {
	constructor() {
		this.allTiles = []
		this.simpleTiles = []
		this.superTiles = []
		this.mapTilesID = {}
		this.mapTilesName = {}
	}

	add(tile) {
		const TILE = { ID: (this.allTiles.length + 1).toString(), ...tile }
		this.allTiles.push(TILE)
		this.mapTilesID[TILE.ID] = TILE
		this.mapTilesName[TILE.NAME] = TILE

		if (TILE.TYPE === 'simple') this.simpleTiles.push(TILE)
		if (TILE.TYPE === 'super') this.superTiles.push(TILE)
	}

	get ALL() {
		return this.allTiles
	}

	get SIMPLE() {
		return this.simpleTiles
	}

	get SUPER() {
		return this.superTiles
	}

	GET_BY_ID(id) {
		return this.mapTilesID[id]
	}

	GET_BY_NAME(name) {
		return this.mapTilesName[name]
	}
}

const TILES = new Tiles()
TILES.add({ TYPE: 'simple', NAME: 'red',    COLOR: '#cb4a50' })
TILES.add({ TYPE: 'simple', NAME: 'green',  COLOR: '#65a43b' })
TILES.add({ TYPE: 'simple', NAME: 'blue',   COLOR: '#4f67c2' })
TILES.add({ TYPE: 'simple', NAME: 'yellow', COLOR: '#e0ab25' })
TILES.add({ TYPE: 'simple', NAME: 'purple', COLOR: '#a055c9' })
TILES.add({ TYPE: 'super',  NAME: 'mixed',  COLOR: '#d9cfcf' })
TILES.add({ TYPE: 'super',  NAME: 'bomb',   COLOR: '#505050' })

export default TILES