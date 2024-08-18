const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router
  .get('/image', async (req, res) => {
    try {
      const filePath = path.join(__dirname, '../mediafiles', `canvas-${req.query.sessionId}.png`);
      fs.readFile(filePath, 'base64', (err, data) => {
        if (data) {
          res.status(200);
          res.json({ canvasLastState: `data:image/png;base64,${data}` });
          res.end();
        } else {
          res.status(204);
          res.end();
        }
      });
    } catch {
      res.status(500);
      res.end();
    }
  })
  .post('/image', async (req, res) => {
    try {
      const data = req.body.canvasLastState;
      const base64Data = data.replace(/^data:image\/png;base64,/, '');
      const filePath = path.join(__dirname, '../mediafiles', `canvas-${req.query.sessionId}.png`);
      fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
          res.status(500);
          res.end();
        } else {
          res.status(201);
          res.end();
        }
      });
    } catch {
      res.status(500);
      res.end();
    }
  });

router.all('/healthcheck', async (req, res) => {
  res.status(200);
  res.json({ status: 'HEALTHCHECK SUCCESS' });
  res.end();
});

module.exports = router;
