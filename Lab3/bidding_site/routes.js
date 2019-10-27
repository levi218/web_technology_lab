const express = require("express");
const router = express.Router();
var passport = require('passport');
let db = require("./db");
var fs = require("fs")
console.log("Loaded: "+db);

function saveToFile(){
	fs.writeFile('./db/data.json', JSON.stringify(db.items), (err) => {
		if (err){
			console.log(err);
			return;
		}
	});
}
//views
router.get("/"/*,require('connect-ensure-login').ensureLoggedIn()*/,(req,res)=>{
	res.render("index",{/*user: req.user,*/ data: db.items.list});
});

router.get("/participants"/*,require('connect-ensure-login').ensureLoggedIn()*/,(req,res)=>{
	res.render("participants",{/*user: req.user,*/ data: db.items.participants});
});

router.get("/settings"/*,require('connect-ensure-login').ensureLoggedIn()*/,(req,res)=>{
	res.render("settings",{/*user: req.user,*/ data: db.items.settings});
});

router.get("/detail/:id"/*,require('connect-ensure-login').ensureLoggedIn()*/,(req,res)=>{
	let data = db.items.list.find((item)=>{
		return item.itemId==req.params.id;
	});
	if(!data||data==null) res.status(404).end("Page not found");
	// else {
		// var myBidding;
		// // console.log(data.participants);
		
		// for(let participant of data.participants){
		// 	if(participant.userId==req.user.username){
		// 		myBidding = participant;   
		// 		break;
		// 	}
		// }
		// res.render("itemDetail",{/*user: req.user,*/ data: data, myBidding: myBidding});
	// }
	res.render("itemDetail",{/*user: req.user,*/ data: data});
});

router.get("/edit/:id"/*,require('connect-ensure-login').ensureLoggedIn()*/,(req,res)=>{
	let data = db.items.list.find((item)=>{
		return item.itemId==req.params.id;
	});
	if(!data||data==null) res.status(404).end("Page not found");
	else res.render("itemEdit",{/*user: req.user,*/ data: data});
});

router.get("/add"/*,require('connect-ensure-login').ensureLoggedIn()*/,(req,res)=>{
	res.render("itemAdd",{/*user: req.user*/});
});

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

// //REST for items

router.get("/items/:id",(req,res)=>{
	const id = req.params.id;
	for (var i = db.items.list.length - 1; i >= 0; i--) {
		if(db.items.list[i].itemId==id){
			res.status(200).json(db.items.list[i]);
			return;
		}
	}
	res.status(404).end("Page not found");
});

router.put("/items",(req,res)=>{
	let newData = req.body;
	console.log(newData);
	let id = newData.itemId;
	for (var i = db.items.list.length - 1; i >= 0; i--) {
		if(db.items.list[i].itemId==id){
			if(newData.name)
				db.items.list[i].name = newData.name;
			if(newData.author)
				db.items.list[i].author = newData.author;
			if(newData.description)
				db.items.list[i].description = newData.description;
			if(newData.start_price)
				db.items.list[i].start_price = parseFloat(newData.start_price);
			if(newData.min_bidding_step)
				db.items.list[i].min_bidding_step = parseFloat(newData.min_bidding_step);
			
			// if(newData.start_time)
			// 	db.items.list[i].start_time = newData.start_time;
			// if(newData.timeout)
			// 	db.items.list[i].timeout = parseFloat(newData.timeout);
			// if(newData.info_time)
			// 	db.items.list[i].info_time = parseFloat(newData.info_time);
			// if(newData.countdown)
			// 	db.items.list[i].countdown = parseFloat(newData.countdown);
			saveToFile()
			res.status(200).end();
			return;
		}
	}
	res.status(404).end("Page not found");
});

router.delete("/items",(req,res)=>{
	let id = JSON.parse(req.body.data);
	for (var i = db.items.list.length - 1; i >= 0; i--) {
		if(db.items.list[i].itemId==id){
			db.items.list.splice(i,1);
		}
	}
	saveToFile()
	res.status(200).json({data:db.items.list});
	console.log(id);
	console.log(db.items.list);
	
});
router.post("/items",(req,res)=>{
	let newData = req.body;
	if(req.files){
		let picture = req.files.picture;
		picture.mv('./public/img/'+picture.name);
		newData.picture = picture.name;
	}
	db.items.lastId+=1;
	// newData.owner = req.user.username;
	newData.itemId = db.items.lastId;
	db.items.list.push(newData);
	saveToFile()
	res.status(200).json({newObj: newData});
});

// REST for participants
router.post("/participants",(req,res)=>{
	let newParticipant = req.body;
	db.items.participants.push(newParticipant);
	saveToFile()
	res.status(200).render("participantList",{data:db.items.participants});
});

router.put("/participants",(req,res)=>{
	let targetParticipant = req.body;
	let participant = db.items.participants.find((p)=>{return p.name==targetParticipant.name})

	participant.money_reserve = targetParticipant.money_reserve;
	saveToFile()
	res.status(200).render("participantList",{data:db.items.participants});
});

router.delete("/participants",(req,res)=>{
	let targetParticipant = req.body;
	db.items.participants = db.items.participants.filter((p)=>{ return p.name!=targetParticipant.name});
	saveToFile()
	res.status(200).render("participantList",{data:db.items.participants});
});

//REST for setting
router.put("/settings",(req,res)=>{
	let newData = req.body;
	console.log(newData);
	if(newData.start_time)
		db.items.settings.start_time = newData.start_time;
	if(newData.timeout)
		db.items.settings.timeout = parseFloat(newData.timeout);
	if(newData.info_time)
		db.items.settings.info_time = parseFloat(newData.info_time);
	if(newData.countdown)
		db.items.settings.countdown = parseFloat(newData.countdown);
	saveToFile()
	res.status(200).end();
});

// handle other links
router.get("*", (req,res) => {
	res.status(404);
	res.end("Page not found");
});
module.exports = router;