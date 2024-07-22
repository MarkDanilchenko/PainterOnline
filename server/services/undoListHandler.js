const undoListHandler = {
	undoList: {},
	pushToUndoList: function (id, lastAction) {
		this.undoList[id].push(lastAction);
	},
	setUndoList: function (id, lastAction) {
		this.undoList[id] = [].concat(lastAction);
	},
};

module.exports = { undoListHandler };
