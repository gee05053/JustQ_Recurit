const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
	res.send("complete");
	console.log("test");
});

app.listen(port, () => {
	console.log("server is listening");
});
