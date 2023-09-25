const express = require("express");
const app = express();
const port = 5000;
const data = require("./data.json");

app.get("/plist", (req, res) => {
	res.send({
		data: data.slice(
			(req.query.pageCount - 1) * req.query.listCount,
			req.query.pageCount * req.query.listCount,
		),
		total: data.length,
	});
});

app.listen(port, () => {
	console.log("server is listening");
});
