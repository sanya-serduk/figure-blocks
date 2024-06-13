import FigureManager from "../system/FigureManager";

const figureManager = new FigureManager()
figureManager.add(10, [
	['0','1','0'],
	['1','1','1'],
	['0','1','0'],
])
figureManager.add(20, [
	['0','1','0'],
	['1','1','1'],
	['1','0','1'],
], 4)
figureManager.add(40, [
	['1','0','1'],
	['1','1','1'],
	['1','0','1'],
], 2)
figureManager.add(80, [
	['1','1','1'],
	['1','0','1'],
	['1','1','1'],
])

const figures = figureManager.figures
export default figures