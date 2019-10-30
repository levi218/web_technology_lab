const express = require("express");
const router = express.Router();
// var passport = require('passport');
let db = require("./db");
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
// //views
// router.get("/"/*,require('connect-ensure-login').ensureLoggedIn()*/,(req,res)=>{
// 	res.render("index",{/*user: req.user,*/ data: db.data.list});
// });

// router.get("/brokers"/*,require('connect-ensure-login').ensureLoggedIn()*/,(req,res)=>{
// 	res.render("brokers",{/*user: req.user,*/ data: db.data.brokers});
// });

// router.get("/settings"/*,require('connect-ensure-login').ensureLoggedIn()*/,(req,res)=>{
// 	res.render("settings",{/*user: req.user,*/ data: db.data.settings});
// });

// router.get("/detail/:id"/*,require('connect-ensure-login').ensureLoggedIn()*/,(req,res)=>{
// 	let data = db.data.list.find((item)=>{
// 		return item.itemId==req.params.id;
// 	});
// 	if(!data||data==null) res.status(404).end("Page not found");
// 	// else {
// 		// var myBidding;
// 		// // console.log(data.brokers);

// 		// for(let participant of data.brokers){
// 		// 	if(participant.userId==req.user.username){
// 		// 		myBidding = participant;   
// 		// 		break;
// 		// 	}
// 		// }
// 		// res.render("itemDetail",{/*user: req.user,*/ data: data, myBidding: myBidding});
// 	// }
// 	res.render("itemDetail",{/*user: req.user,*/ data: data});
// });

// router.get("/edit/:id"/*,require('connect-ensure-login').ensureLoggedIn()*/,(req,res)=>{
// 	let data = db.data.list.find((item)=>{
// 		return item.itemId==req.params.id;
// 	});
// 	if(!data||data==null) res.status(404).end("Page not found");
// 	else res.render("itemEdit",{/*user: req.user,*/ data: data});
// });

// router.get("/add"/*,require('connect-ensure-login').ensureLoggedIn()*/,(req,res)=>{
// 	res.render("itemAdd",{/*user: req.user*/});
// });

// router.get('/login',
// 	function(req, res){
// 		if (!req.user)
// 			res.render('login');
// 		else res.redirect('/');
// 	}
// );

// router.post('/login', 
// 	passport.authenticate('local', { failureRedirect: '/login' }),
// 		function(req, res) {
// 			res.redirect('/');
// 		}
// );
// router.get('/logout',
// 	function(req, res){
// 		req.logout();
// 		res.redirect('/');
// 	}
// );

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
	if (!broker.balance) broker.balance = broker.cash_reserve
	broker.balance -= wanted_stock.share_price * command.quantity
	wanted_stock.share_available -= command.quantity;
});

router.post("/stocks/sell", (req, res) => {
	const command = req.body
	//check existence
	// let d_stock = getStock(command.symbol)
	// let broker = db.data.brokers.find(b => b.name == command.broker);
	// if (!broker || !wanted_stock) {
	// 	res.status(200).json({ error: "Cant find broker or stock" })
	// 	return;
	// }
	// check availability
	// if (command.quantity > wanted_stock.share_available) {
	// 	res.status(200).json({ error: "Quantity greater than available" })
	// 	return;
	// }

	// // add to history
	// if (!broker.owned) broker.owned = [];
	// let stock = broker.owned.find(p => p.symbol == command.symbol);
	// if (!stock) {
	// 	stock = {
	// 		symbol: command.symbol,
	// 		history: []
	// 	}
	// 	broker.owned.push(stock);
	// }
	// stock.history.push({
	// 	bought_price: wanted_stock.share_price * command.quantity,
	// 	quantity: command.quantity
	// })
	// res.status(200).json({ status: 0 })
	// //subtract from stock
	// if (!broker.balance) broker.balance = broker.cash_reserve
	// broker.balance -= wanted_stock.share_price * command.quantity
	// wanted_stock.share_available -= command.quantity;
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
	Object.assign(db.data.settings, newData);
	saveToFile()
	res.status(200).end();
});

// handle other links
router.get("*", (req, res) => {
	res.status(404);
	res.end("Page not found");
});
module.exports = router;