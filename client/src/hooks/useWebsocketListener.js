import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { clearCanvas, redoAction, syncUndoStateList, undoAction } from '../store/canvasReducer.js';
import drawHandler from '../services/draw_handler.js';

const useWebsocketListener = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const socket = useSelector((state) => {
    return state.connectionReducer.socket;
  });
  const username = useSelector((state) => {
    return state.connectionReducer.username;
  });
  const sessionId = useSelector((state) => {
    return state.connectionReducer.sessionId;
  });
  const canvas = useSelector((state) => {
    return state.canvasReducer.canvas;
  });

  React.useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: 'connection',
          username: username,
          sessionId: sessionId
        })
      );
    };
    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      switch (response.type) {
        case 'connection':
          if (response.canvasCommonUndoStateList.length) {
            dispatch(syncUndoStateList(response.canvasCommonUndoStateList));
          }
          break;
        case 'draw':
          drawHandler(response, canvas);
          break;
        case 'clear':
          socket.send(
            JSON.stringify({
              type: 'commonUndoStateListSync',
              sessionId: response.sessionId,
              canvasLastState: canvas.toDataURL()
            })
          );
          dispatch(clearCanvas());
          axios.post(
            `http://${process.env.REACT_APP_HOST_SERVER || '127.0.0.1'}:${process.env.REACT_APP_PORT_SERVER || '5000'}/api/v1/image?sessionId=${params.id}`,
            {
              canvasLastState: canvas.toDataURL()
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          break;
        case 'commonUndoStateListSync':
          dispatch(syncUndoStateList(response.canvasCommonUndoStateList));
          break;
        case 'undo':
          if (response.canvasUndoStateList.length) {
            const lastCanvasState = response.canvasUndoStateList[response.canvasUndoStateList.length - 1];
            const img = new Image();
            img.src = lastCanvasState;
            img.onload = () => {
              dispatch(undoAction(img));
              axios.post(
                `http://${process.env.REACT_APP_HOST_SERVER || '127.0.0.1'}:${process.env.REACT_APP_PORT_SERVER || '5000'}/api/v1/image?sessionId=${params.id}`,
                {
                  canvasLastState: lastCanvasState
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              );
            };
          }
          break;
        case 'redo':
          if (response.canvasRedoStateList.length) {
            const nextCanvasState = response.canvasRedoStateList[response.canvasRedoStateList.length - 1];
            const img = new Image();
            img.src = nextCanvasState;
            img.onload = () => {
              dispatch(redoAction(img));
              axios.post(
                `http://${process.env.REACT_APP_HOST_SERVER || '127.0.0.1'}:${process.env.REACT_APP_PORT_SERVER || '5000'}/api/v1/image?sessionId=${params.id}`,
                {
                  canvasLastState: nextCanvasState
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              );
            };
          }
          break;
        default:
          break;
      }
    };
    // eslint-disable-next-line
  }, [socket]);
};

export default useWebsocketListener;
