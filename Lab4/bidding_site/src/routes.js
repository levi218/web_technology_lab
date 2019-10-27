const express = require("express");
const router = express.Router();
var passport = require('passport');
let db = require("./db");
debug = require('debug')('router')

const io=require('socket.io').listen(3030);
io.sockets.on('connection',function (socket){
});

debug("Loaded: "+db);
// function saveToFile(){
// 	fs.writeFile('./db/data.json', JSON.stringify(db.data), (err) => {
// 		if (err){
// 			debug(err);
// 			return;
// 		}
// 	});
// }
//views
// router.get("/"/*,require('connect-ensure-login').ensureLoggedIn()*/,(req,res)=>{
// 	res.render("index",{user: req.user, data: db.data.list, participants: db.data.participants});
// });

// router.get("/admin",require('connect-ensure-login').ensureLoggedIn(),(req,res)=>{
// 	if(req.user.name==="admin")
// 		res.render("_adminPage",{user: req.user, data: db.data.list, participants: db.data.participants});
// 	else
// 		res.status(404).end("Page not found");
// });

var currentItem = db.data.list[0];
var currentBids = []
var currentAuctionStartTime;

var status = 0;
// participant page
router.get("/",require('connect-ensure-login').ensureLoggedIn(),(req,res)=>{
	if(req.user.name!=="admin")
		res.render("_participantPage",{user: req.user, item: currentItem, status: status});
	else
		res.render("_adminPage",{user: req.user, items: db.data.list, participants: db.data.participants.filter(p=>p.name!="admin")});
});

router.get("/history",require('connect-ensure-login').ensureLoggedIn(),(req,res)=>{
	if(req.user.name!=="admin"){
		debug(db.data.list)
		res.render("_historyPage",{user: req.user, items: db.data.list.filter(item=>item.soldTo && item.soldTo.user==req.user.name)});
	}else
		res.status(404).end("Page not found");
});

router.get("/detail/:id",require('connect-ensure-login').ensureLoggedIn(),(req,res)=>{
	let data = db.data.list.find((item)=>{
		return item.itemId==req.params.id;
	});
	if(!data||data==null) res.status(404).end("Page not found");
	res.render("itemDetail",{user: req.user, data: data});
});

router.get("/current_participants",(req,res)=>{
	res.status(200).render("participantList",{item:currentItem});
});

router.get("/user_info",(req,res)=>{
	res.status(200).json({user:req.user});
});

router.get("/items",(req,res)=>{
	res.status(200).render("itemList",{items:db.data.list});
});
router.get("/current_item",(req,res)=>{
	res.status(200).render("itemInfo",{item:currentItem, status:status});
});
router.post("/bid",(req,res)=>{
	let newBid = req.body;
	if(req.user)
		newBid.user = req.user.name;
	// ERROR CHECKING
	newBid.price = parseFloat(newBid.price);
	if(req.user.money_reserve<newBid.price){
		res.status(200).json({error:"Reserve not enough"});
		return;
	}
	if(currentBids.length!=0 && (newBid.price<(currentBids[0].price+currentItem.min_bidding_step))){
		res.status(200).json({error:"Bid annot be lower than current highest plus minimum bidding step"});
		return;
	}
	if(newBid.price<currentItem.start_price){
		res.status(200).json({error:"Lower than starting price ("+currentItem.start_price+")"});
		return;
	}
	
	currentBids.push(newBid);
	currentBids = currentBids.sort((a,b)=> b.price-a.price);
	res.status(200).json({status:"ok"});
});

// Promise to resolve each auction item

var currentStage = new Promise(function(resolve,reject){
	// Wait until auction session start
	var auctionStart = setTimeout(function clock1(){
		let start_time = new Date(db.data.settings.start_time);
		let now = new Date();
		time_left = parseInt((start_time - now) / 1000);
		if(time_left<=0){
			// send message about auction start
			debug("Auction started!");
			io.emit("auction_start")
			status+=1;
			resolve();
		}else{
			// send message about time update
			debug("Time until auction start: "+time_left);
			io.emit("auction_start_cd",time_left)
			setTimeout(clock1,1000);
		}
	})
}); 
for(let item of db.data.list){
	//for each item, start a promise chain
	currentStage = currentStage.then(function(result){
		// prepare item info
		currentItem = item;
		// send message about currentItem update to reload information on client
		debug("Item information: "+JSON.stringify(currentItem));
		io.emit("item_changed",JSON.stringify(currentItem))
		return 0;
	}).then(function(result){
		// information time
		return new Promise(function(resolve,reject){
			currentAuctionStartTime = new Date();
			var info_time = db.data.settings.info_time;
			var infoTimeClock = setTimeout(function clock2(){
				//let start_time = new Date(db.data.settings.start_time);
				let now = new Date();
				time_left = parseInt((now - currentAuctionStartTime) / 1000);
				if(time_left<=info_time){
					//send message about time update
					debug("Information time: "+(info_time-time_left));
					io.emit("information_time_cd",(info_time-time_left))
					setTimeout(clock2,1000);
				}else{
					// send message about information time's over
					debug("Information time is over");
					io.emit("information_time_over")
					resolve(0);
				}
			},1000)
		});
	}).then(function(result){
		return new Promise(function(resolve,reject){
			// auction time
			var countdownClock = null;
			var info_time = db.data.settings.info_time;
			var countdown = db.data.settings.countdown;
			var timeout = db.data.settings.timeout;
			var numberOfBids = 0;
			// clear bids list
			currentBids = [];

			var auctionClock = setTimeout(function clock3(){
				//let start_time = new Date(db.data.settings.start_time);
				let now = new Date();
				time_left = parseInt((now - currentAuctionStartTime) / 1000);
				if(time_left<=info_time+timeout){
					//send message about time update
					debug("Time until auction for this item ends: "+(info_time+timeout-time_left));
					io.emit("auction_time_cd",(info_time+timeout-time_left))
					if(currentBids.length>0){
						//there is at least 1 bid, start the countdown
						if(currentBids.length == numberOfBids){
							//countdownClock = setTimeout(function clock4(){
								if(countdown>0) {
									countdown--;	
									//countdownClock = setTimeout(clock4,1000);
								}else {
									// countdown's over, end auction phase #code=0
									resolve(0);
									io.emit("auction_over")
									return;
								}
								// send message about the countdown
								debug("Countdown until bidding ends: "+countdown);
								io.emit("countdown",countdown)
							//},1000);
						}else{
							//reset countdown as there were incoming bids
							numberOfBids = currentBids.length;
							countdown = db.data.settings.countdown;
							// send message about price change
							debug("Highest price: "+JSON.stringify(currentBids[0]))
							io.emit("price_changed",currentBids[0].price)
						}
					}
					//continue the timeout countdown
					setTimeout(clock3,1000);
					
				}else{
					resolve(1); // return with code #1 (no buyer)
					// send message about auction time's over
					debug("Auction time for this item is over");
					io.emit("auction_over")
					return;
				}
		
			},1000)
		})
	}).then(function(result){
		// auction ends, finalizing result
		
		// send message about result
		if(result==0){
			// save buyer
			db.data.list.find(item=>(item.itemId==currentItem.itemId)).soldTo = currentBids[0];
			//currentItem.soldTo = currentBids[0];
			// send message to announce buyer
			debug("Item sold to "+JSON.stringify(currentBids));
			io.emit("announce_buyer",currentBids[0].user) // user here is username only
			// recalculate the user balance and announce change
			for(var participant of db.data.participants){
				if(participant.name==currentBids[0].user){
					participant.money_reserve -= currentBids[0].price;
				}
			}
			io.emit("balance_updated")

		}else{
			//to the next item
			debug("Auction for this item has ended with no buyer");
			io.emit("announce_buyer",null)
			return 0;
		}
		
	})
}
currentStage.then(function(result){
	currentItem = null;
	status=2;
	io.emit("session_ended")
	return 0;
})

router.get('/login',
	function(req, res){
		if (!req.user)
			res.render('login');
		else res.redirect('/');
	}
);

router.post('/login', 
	passport.authenticate('local', { failureRedirect: '/login' }),
		function(req, res) {
			res.redirect('/');
		}
);
router.get('/logout',
	function(req, res){
		req.logout();
		res.redirect('/');
	}
);

// handle other links
router.get("*", (req,res) => {
	res.status(404);
	res.end("Page not found");
});
module.exports = router;