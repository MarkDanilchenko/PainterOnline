const canvasStateListHandler = {
  commonUndoStateList: {},
  pushToCommonUndoStateList: function (id, canvasState) {
    this.commonUndoStateList[id].push(canvasState);
  },
  setCommonUndoStateList: function (id, canvasState) {
    this.commonUndoStateList[id] = [canvasState];
  },
  popFromCommonUndoStateList: function (id) {
    this.commonUndoStateList[id].pop();
  }
};

module.exports = canvasStateListHandler;
