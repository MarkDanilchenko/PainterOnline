import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setStrokeColor, setTool } from '../store/toolsReducer.js';
import { Brush, Circle, Eraser, Line, Rectangle } from '../services/tools_handler.js';
import ModalNotice from './ModalNotice.jsx';

const ToolBar = () => {
  const dispatch = useDispatch();
  const canvas = useSelector((state) => {
    return state.canvasReducer.canvas;
  });
  const canvasUndoStateList = useSelector((state) => {
    return state.canvasReducer.undoStateList;
  });
  const canvasRedoStateList = useSelector((state) => {
    return state.canvasReducer.redoStateList;
  });
  const currentTool = useSelector((state) => {
    return state.toolsReducer.tool;
  });
  const socket = useSelector((state) => {
    return state.connectionReducer.socket;
  });
  const sessionId = useSelector((state) => {
    return state.connectionReducer.sessionId;
  });

  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('');
  const [modalResult, setModalResult] = React.useState(false);

  React.useEffect(() => {
    if (modalResult) {
      socket.send(
        JSON.stringify({
          type: 'clear',
          sessionId: sessionId
        })
      );
    }
    setModalResult(false);
    // eslint-disable-next-line
  }, [modalResult]);

  const undoAction = () => {
    socket.send(
      JSON.stringify({
        type: 'undo',
        sessionId: sessionId,
        canvasUndoStateList: canvasUndoStateList
      })
    );
  };
  const redoAction = () => {
    socket.send(
      JSON.stringify({
        type: 'redo',
        sessionId: sessionId,
        canvasRedoStateList: canvasRedoStateList
      })
    );
  };
  const clearCanvas = () => {
    setModalContent(
      'Are you sure you want to clear the canvas? This action cannot be undone and will completely clear the canvas for all currently connected users!'
    );
    setShowModal(true);
  };
  const saveCanvasImg = () => {
    const data = canvas.toDataURL();
    const a = document.createElement('a');
    a.style = 'display: none';
    a.href = data;
    a.download = `canvas-${sessionId}.png`;
    a.click();
    a.remove();
  };

  return (
    <>
      <ModalNotice
        showModal={showModal}
        modalContent={modalContent}
        setShowModal={setShowModal}
        setModalResult={setModalResult}
      />
      <div className='toolBar'>
        <div>
          <button
            className={`toolBar__button_brush ${currentTool instanceof Brush ? 'active' : ''}`}
            onClick={() => {
              dispatch(setTool(new Brush(canvas, socket, sessionId)));
              dispatch(setStrokeColor(document.getElementById('settingsBar__input_colorPicker-stroke').value));
              // The second dispatch is needed if we want to use any tool with selected color after eraser.
              // Otherwise stroke color will be white (like eraser).
            }}></button>
          <button
            className={`toolBar__button_rectangle ${currentTool instanceof Rectangle ? 'active' : ''}`}
            onClick={() => {
              dispatch(setTool(new Rectangle(canvas, socket, sessionId)));
              dispatch(setStrokeColor(document.getElementById('settingsBar__input_colorPicker-stroke').value));
            }}></button>
          <button
            className={`toolBar__button_circle ${currentTool instanceof Circle ? 'active' : ''}`}
            onClick={() => {
              dispatch(setTool(new Circle(canvas, socket, sessionId)));
              dispatch(setStrokeColor(document.getElementById('settingsBar__input_colorPicker-stroke').value));
            }}></button>
          <button
            className={`toolBar__button_eraser ${currentTool instanceof Eraser ? 'active' : ''}`}
            onClick={() => {
              dispatch(setTool(new Eraser(canvas, socket, sessionId)));
              dispatch(setStrokeColor(document.getElementById('settingsBar__input_colorPicker-stroke').value));
            }}></button>
          <button
            className={`toolBar__button_line ${currentTool instanceof Line ? 'active' : ''}`}
            onClick={() => {
              dispatch(setTool(new Line(canvas, socket, sessionId)));
              dispatch(setStrokeColor(document.getElementById('settingsBar__input_colorPicker-stroke').value));
            }}></button>
        </div>
        <div>
          <button className='toolBar__button_undo' onClick={() => undoAction()}></button>
          <button className='toolBar__button_redo' onClick={() => redoAction()}></button>
          <button className='toolBar__button_save' onClick={() => saveCanvasImg()}></button>
          <button className='toolBar__button_clear' onClick={() => clearCanvas()}></button>
        </div>
      </div>
    </>
  );
};

export default ToolBar;
