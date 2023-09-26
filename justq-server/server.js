const express = require("express");
const app = express();
const port = 5000;
const data = require("./data.json");

app.get("/plist", (req, res) => {
	res.send({
		products: data.slice(
			(req.query.pageCount - 1) * req.query.cardCount,
			req.query.pageCount * req.query.cardCount,
		),
		total: data.length,
	});
});

app.listen(port, () => {
	console.log("server is listening");
});
