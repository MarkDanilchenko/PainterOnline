import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { pushToUndoStateList, setCanvas, setCanvasDefaultSettings } from '../store/canvasReducer.js';

const Canvas = (props) => {
  const dispatch = useDispatch();
  const canvasRef = React.useRef();
  const params = useParams();

  const socket = useSelector((state) => {
    return state.connectionReducer.socket;
  });
  const undoStateList = useSelector((state) => {
    return state.canvasReducer.undoStateList;
  });

  React.useEffect(() => {
    dispatch(setCanvas(canvasRef.current));
    dispatch(setCanvasDefaultSettings());

    axios
      .get(
        `http://${process.env.REACT_APP_HOST_SERVER || '127.0.0.1'}:${process.env.REACT_APP_PORT_SERVER || '5000'}/api/v1/image?sessionId=${params.id}`
      )
      .then((res) => {
        if (res.data.canvasLastState) {
          const img = new Image();
          img.src = res.data.canvasLastState;
          img.onload = () => {
            canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            if (img.width > canvasRef.current.width || img.height > canvasRef.current.height) {
              canvasRef.current
                .getContext('2d')
                .drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
            } else {
              canvasRef.current.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
            }
          };
        } else {
          canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      })
      .catch(() => {
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      });
    // eslint-disable-next-line
  }, []);

  const mouseDownHandler = () => {
    dispatch(pushToUndoStateList(canvasRef.current.toDataURL()));
  };
  const mouseUpHandler = () => {
    axios
      .post(
        `http://${process.env.REACT_APP_HOST_SERVER || '127.0.0.1'}:${process.env.REACT_APP_PORT_SERVER || '5000'}/api/v1/image?sessionId=${params.id}`,
        {
          canvasLastState: canvasRef.current.toDataURL()
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        socket.send(
          JSON.stringify({
            type: 'commonUndoStateListSync',
            sessionId: params.id,
            canvasLastState: undoStateList[undoStateList.length - 1]
          })
        );
      });
  };

  return (
    <div className='canvas'>
      <canvas
        ref={canvasRef}
        id='canvas'
        onMouseDown={() => mouseDownHandler()}
        onMouseUp={() => mouseUpHandler()}
        width={props.width}
        height={props.height}></canvas>
    </div>
  );
};

export default Canvas;
