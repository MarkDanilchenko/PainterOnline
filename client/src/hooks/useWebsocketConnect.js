import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setSessionId, setSocket } from '../store/connectionReducer.js';

const useWebsocketConnect = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const username = useSelector((state) => {
    return state.connectionReducer.username;
  });

  React.useEffect(() => {
    if (!username) {
      return;
    }

    const socket = new WebSocket(
      `ws://${process.env.REACT_APP_HOST_SERVER || '127.0.0.1'}:${process.env.REACT_APP_PORT_SERVER || '5000'}/`
    );
    dispatch(setSocket(socket));
    dispatch(setSessionId(params.id));
    // eslint-disable-next-line
  }, [username]);
};

export default useWebsocketConnect;
