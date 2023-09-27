const express = require("express");
const app = express();
const port = 5000;
const data = require("./data.json");

app.get("/plist", (req, res) => {
	let searchData = data.filter((product) =>
		RegExp(`\w*${req.query.searchString}\w*`).test(product.product_name),
	);
	res.send({
		products: searchData.slice(
			(req.query.pageCount - 1) * req.query.cardCount,
			req.query.pageCount * req.query.cardCount,
		),
		total: searchData.length,
	});
});

app.listen(port, () => {
	console.log("server is listening");
});
