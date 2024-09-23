## App Description &#128209;

This is a online painter app based on such technologies as React, Redux, NodeJS, Express.<br> Server is based both on websocket and http protocols.<br> Users can paint on the canvas at the same time with live canvas rerendering.

## Launch instructions &#128190;

&#9881;**Frontend**:

- React;
- Redux-Toolkit;
- Bootstrap5;
- React-bootstrap;
- HTML/SCSS;
- Canvas API;
  
&#9881;**Backend**:

- NodeJS (ExpressJS);
- Websockets/HTTP;

<div style="display: flex; justify-content: end;">
  <p>Git and Docker should be installed locally on Your PC.</p>
</div>

---

1. Clone repository to Your local path:

    ```sh
    cd <your_local_path> && git clone <http/ssh-link>
    ```

2. Install all server necessary dependencies:

    ```sh
    cd PainterOnline/server && npm install
    ```

3. Install all client necessary dependencies::

    ```sh
    cd PainterOnline/client && npm install
    ```

4. **!!!First** start **server**:

    ```sh
    cd PainterOnline/server && npm run start
    ```

5. **!!!Second** start **client**:

    ```sh
    cd PainterOnline/client && npm run demo
    ```

6. After the installation is complete the web-app will start on `127.0.0.1:5000`;

- Open web-app in browser using URL: <http://127.0.0.1:5000/>

7. To stop the server/client:

    ```sh
    Ctrl + C
    ```

---

### p.s

- You can change the default API host:port in ./.env.public;
- Make sure that `HOST_SERVER` & `REACT_APP_HOST_SERVER` and `PORT_SERVER` & `REACT_APP_PORT_SERVER` must have the **same values**.

## Screenshots &#127745;

1. Main page

<div align="center">
    <img src="./screenshots/ScrShot_1.png" width="75%" height="75%" alt='Main page'>
</div>

<br>

---
