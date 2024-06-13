export default class Helper {
	static getRandomInteger(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	static get isTouchDevice() {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
	}

	static getPath2DRoundRect(x, y, w, h, r) {
		r = Math.min(w/2, h/2, r)
		const path = new Path2D()
		path.moveTo(x+r, y)
		path.arcTo(x+w, y,   x+w, y+h, r)
		path.arcTo(x+w, y+h, x,   y+h, r)
		path.arcTo(x,   y+h, x,   y,   r)
		path.arcTo(x,   y,   x+w, y,   r)
		path.closePath()
		return path
	}

	static getPath2DRoundedPolygon(points, radiusAll) {
		const path2D = new Path2D()
		let i, x, y, len, p1, p2, p3, v1, v2, sinA, sinA90, radDirection, drawDirection, angle, halfAngle, cRadius, lenOut,radius;
		const asVec = function(p, pp, v) {
			v.x = pp.x - p.x
			v.y = pp.y - p.y
			v.len = Math.sqrt(v.x * v.x + v.y * v.y)
			v.nx = v.x / v.len
			v.ny = v.y / v.len
			v.ang = Math.atan2(v.ny, v.nx)
		}
		radius = radiusAll
		v1 = {}
		v2 = {}
		len = points.length
		p1 = points[len - 1]
		for (i = 0; i < len; i++) {
			p2 = points[(i) % len]
			p3 = points[(i + 1) % len]
			asVec(p2, p1, v1)
			asVec(p2, p3, v2)
			sinA = v1.nx * v2.ny - v1.ny * v2.nx
			sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny
			angle = Math.asin(sinA < -1 ? -1 : sinA > 1 ? 1 : sinA)
			radDirection = 1
			drawDirection = false
			if (sinA90 < 0) {
				if (angle < 0) {
					angle = Math.PI + angle
				} else {
					angle = Math.PI - angle
					radDirection = -1
					drawDirection = true
				}
			} else {
				if (angle > 0) {
					radDirection = -1
					drawDirection = true
				}
			}
			if (p2.radius !== undefined) {
				radius = p2.radius
			} else {
				radius = radiusAll
			}
			halfAngle = angle / 2;
			lenOut = Math.abs(Math.cos(halfAngle) * radius / Math.sin(halfAngle))
			if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
				lenOut = Math.min(v1.len / 2, v2.len / 2)
				cRadius = Math.abs(lenOut * Math.sin(halfAngle) / Math.cos(halfAngle))
			} else {
				cRadius = radius
			}
			x = p2.x + v2.nx * lenOut
			y = p2.y + v2.ny * lenOut
			x += -v2.ny * cRadius * radDirection
			y += v2.nx * cRadius * radDirection

			const startAngle = v1.ang + Math.PI / 2 * radDirection
			const endAngle = v2.ang - Math.PI / 2 * radDirection

			path2D.arc(x, y, cRadius, startAngle, endAngle, drawDirection)
			p1 = p2
			p2 = p3
		}

		path2D.closePath()
		return path2D
	}

	static gridArrayToString(grid, rowSeparator = ',', colSeparator = '') {
		return grid.map(row => row.join(colSeparator)).join(rowSeparator)
	}

	static stringToGridArray(str, rowSeparator = ',', colSeparator = '') {
		return str.split(rowSeparator).map(row => row.split(colSeparator))
	}

	static getGridArray(numRows, numCols, cellValue) {
		const grid = []
		for (let row = 0; row < numRows; row++) {
			grid[row] = []
			for (let col = 0; col < numCols; col++) {
				grid[row][col] = cellValue
			}
		}
		return grid
	}
}