// --------------------------------------ROUTER_CONFIG
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// --------------------------------------ROUTER
router
	.get("/image", async (req, res) => {
		try {
			const filePath = path.join(__dirname, "../mediafiles", `canvas-${req.query.sessionId}.png`);
			fs.readFile(filePath, "base64", (err, data) => {
				if (err) {
					res.status(404);
					res.json({ message: "This session is clear. No recent canvas image was found." });
					res.end();
				} else {
					res.status(200);
					res.json({ canvasImgData: `data:image/png;base64,${data}` });
					res.end();
				}
			});
		} catch (e) {
			res.status(500);
			res.end();
		}
	})
	.post("/image", async (req, res) => {
		try {
			const data = req.body.canvasImgData;
			const base64Data = data.replace(/^data:image\/png;base64,/, "");
			const filePath = path.join(__dirname, "../mediafiles", `canvas-${req.query.sessionId}.png`);
			fs.writeFile(filePath, base64Data, "base64", (err) => {
				if (err) {
					res.status(500);
					res.end();
				}
			});
		} catch (e) {
			res.status(500);
			res.end();
		}
	});

// --------------------------------------EXPORT
module.exports = { router };
