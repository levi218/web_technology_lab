const express = require("express");
const router = express.Router();
// var passport = require('passport');
let db = require("./db");
const random = require("./random");
var fs = require("fs")
console.log("Loaded: " + db);

function saveToFile() {
	fs.writeFile('./server/db/data.json', JSON.stringify(db.data, null, 4), (err) => {
		if (err) {
			console.log(err);
			return;
		}
	});
}

// update prices over time
function updatePrice() {
	db.data.stocks.forEach(stock => {
		stock.prev_price = stock.share_price;
		let rand = stock.distribution_law === "uniform" ? random.rnd_unif() : random.rnd_norm();
		stock.share_price = stock.share_price * (1 + stock.max_change * rand / 100);
		stock.last_change = rand * stock.max_change;
	})
}

var interval = null;
function setExchangeStatus(isActive) {
	if (isActive === true) {
		if(interval==null)
			interval = setInterval(updatePrice, db.data.settings.recalculate_interval * 1000);
		db.data.settings.enabledExchange = true;
	}else{
		if(interval!=null){
			clearInterval(interval);
		}
		interval = null;
		db.data.settings.enabledExchange = false;
	}
}

setExchangeStatus(false);

// //REST for stocks
router.get("/all", (req, res) => {
	res.status(200).json(db.data);
});

router.get("/stocks", (req, res) => {
	res.status(200).json(db.data.stocks);
});

router.get("/stocks/:symbol", (req, res) => {
	const symbol = req.params.symbol;
	let result = db.data.stocks.find(s => s.symbol == symbol);
	res.status(200).json(result);
});

function getStock(symbol) {
	let stock = db.data.stocks.find(s => s.symbol == symbol);
	return stock;
}

router.post("/stocks/buy", (req, res) => {
	if(!db.data.settings.enabledExchange){
		res.status(200).json({ error: "Exchange is currently offline" })
		return;
	}
	const command = req.body
	//check existence
	let wanted_stock = getStock(command.symbol)
	let broker = db.data.brokers.find(b => b.name == command.broker);
	if (!broker || !wanted_stock) {
		res.status(200).json({ error: "Cant find broker or stock" })
		return;
	}
	// check availability
	if (command.quantity > wanted_stock.share_available) {
		res.status(200).json({ error: "Quantity greater than available" })
		return;
	}

	if (!broker.balance) broker.balance = broker.cash_reserve
	if (!wanted_stock.total_share) wanted_stock.total_share = wanted_stock.share_available

	if (broker.balance < wanted_stock.share_price * command.quantity) {
		res.status(200).json({ error: "Balance not enough" })
		return;
	}
	// add to history
	if (!broker.owned) broker.owned = [];
	let stock = broker.owned.find(p => p.symbol == command.symbol);
	if (!stock) {
		stock = {
			symbol: command.symbol,
			history: []
		}
		broker.owned.push(stock);
	}
	stock.history.push({
		bought_price: wanted_stock.share_price * command.quantity,
		quantity: command.quantity
	})
	res.status(200).json({ status: 0 })
	//subtract from stock
	broker.balance -= wanted_stock.share_price * command.quantity
	wanted_stock.share_available -= command.quantity;
});

router.post("/stocks/sell", (req, res) => {
	if(!db.data.settings.enabledExchange){
		res.status(200).json({ error: "Exchange is currently offline" })
		return;
	}
	const command = req.body
	//check existence
	let selling_stock = getStock(command.symbol)
	let broker = db.data.brokers.find(b => b.name == command.broker);
	if (!broker || !selling_stock) {
		res.status(200).json({ error: "Cant find broker or stock" })
		return;
	}
	// check availability
	let owned_quantity = 0;
	if (!broker.owned) {
		res.status(200).json({ error: "Not owning any share of this stock" })
		return;
	}
	let owned_stock = broker.owned.find(s => s.symbol == command.symbol)
	if (!owned_stock) {
		res.status(200).json({ error: "Not owning any share of this stock" })
		return;
	}
	owned_stock.history.forEach(element => {
		owned_quantity += element.quantity;
	});
	if (command.quantity > owned_quantity) {
		res.status(200).json({ error: "Quantity greater than owned quantity" })
		return;
	}

	// add to history
	owned_stock.history.push({
		bought_price: -selling_stock.share_price * command.quantity,
		quantity: -command.quantity
	})
	// //subtract from stock
	if (!broker.balance) broker.balance = broker.cash_reserve
	broker.balance += selling_stock.share_price * command.quantity
	selling_stock.share_available += command.quantity;

	res.status(200).json({ status: 0 })
});




router.post("/stocks", (req, res) => {
	let newData = req.body;
	db.data.stocks.push(newData);
	saveToFile()
	res.status(200).json(db.data.stocks);
});

router.put("/stocks", (req, res) => {
	let newData = req.body;
	let symbol = newData.symbol;
	let oldData = db.data.stocks.find(s => s.symbol == symbol);
	Object.assign(oldData, newData);
	saveToFile()
	res.status(200).json(db.data.stocks);
});

router.delete("/stocks/:symbol", (req, res) => {
	let symbol = req.params.symbol;
	let index = db.data.stocks.findIndex(s => s.symbol == symbol);
	if (index != -1)
		db.data.stocks.splice(index, 1);
	saveToFile()
	res.status(200).json(db.data.stocks);
});


// REST for brokers
router.get("/brokers", (req, res) => {
	res.status(200).json(db.data.brokers);
});

router.get("/brokers/:name", (req, res) => {
	const name = req.params.name;
	let result = db.data.brokers.find(s => s.name == name);
	res.status(200).json(result);
});

router.post("/brokers", (req, res) => {
	let newData = req.body;
	db.data.brokers.push(newData);
	saveToFile()
	res.status(200).json(db.data.brokers);
});

router.put("/brokers", (req, res) => {
	let newData = req.body;
	let name = newData.name;
	let oldData = db.data.brokers.find(s => s.name == name);
	Object.assign(oldData, newData);
	saveToFile()
	res.status(200).json(db.data.brokers);
});

router.delete("/brokers/:name", (req, res) => {
	let name = req.params.name;
	let index = db.data.brokers.findIndex(s => s.name == name);
	if (index != -1)
		db.data.brokers.splice(index, 1);
	saveToFile()
	res.status(200).json(db.data.brokers);

});

//REST for setting
router.get("/settings", (req, res) => {
	res.status(200).json(db.data.settings);
});

router.put("/settings", (req, res) => {
	let newData = req.body;
	console.log(newData);
	if(newData.enabledExchange!=undefined && newData.enabledExchange!=null){
		setExchangeStatus(newData.enabledExchange)
	}
	Object.assign(db.data.settings, newData);
	saveToFile()
	res.status(200).json({status: 0});
});

// handle other links
router.get("*", (req, res) => {
	res.status(404);
	res.end("Page not found");
});
module.exports = router;