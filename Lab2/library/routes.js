const express = require("express");
const router = express.Router();
var passport = require('passport');
let db = require("./db");

console.log("Loaded: "+db);


//views
router.get("/",require('connect-ensure-login').ensureLoggedIn(),(req,res)=>{
	res.render("bookList",{data: db.books.list});
});

router.get("/detail/:id",require('connect-ensure-login').ensureLoggedIn(),(req,res)=>{
	let data = db.books.list.find((book)=>{
		return book.bookId==req.params.id;
	});
	if(!data||data==null) res.status(404).end("Page not found");
	else res.render("bookDetail",{data: data});
});

router.get("/edit/:id",require('connect-ensure-login').ensureLoggedIn(),(req,res)=>{
	let data = db.books.list.find((book)=>{
		return book.bookId==req.params.id;
	});
	if(!data||data==null) res.status(404).end("Page not found");
	else res.render("bookEdit",{data: data});
});

router.get("/add",require('connect-ensure-login').ensureLoggedIn(),(req,res)=>{
	res.render("bookAdd",{});
});

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

//REST
router.get("/books",(req,res)=>{
	const isAvailable = req.query.isAvailable;
	const name = req.query.name;
	const dueDate = req.query.dueDate;
	let result = db.books.list.filter((book) => {
		if(isAvailable!=undefined){
			if(isAvailable=="true"&&book.isAvailable==false) return false;
		}
		if(name!=undefined&&name!=""){
			if(book.bookName.indexOf(name)==-1) return false;
		}
		if(dueDate!=undefined&&dueDate!=""){
			if(book.isAvailable||book.lendingList.length==0||book.lendingList[0].dueDate==undefined) return false;
			if(book.lendingList[0].dueDate.indexOf(dueDate)==-1) return false;
		}
		return true;
	});
	res.status(200).render("list",{data:result});
});

router.get("/books/:id",(req,res)=>{
	const id = req.params.id;
	for (var i = db.books.list.length - 1; i >= 0; i--) {
		if(db.books.list[i].bookId==id){
			res.status(200).json(db.books.list[i]);
			return;
		}
	}
	res.status(404).end("Page not found");
});

router.put("/books",(req,res)=>{
	let newData = JSON.parse(req.body.data);
	console.log(newData);
	let id = newData.bookId;
	for (var i = db.books.list.length - 1; i >= 0; i--) {
		if(db.books.list[i].bookId==id){
			if(newData.bookName)
				db.books.list[i].bookName = newData.bookName;
			if(newData.author)
				db.books.list[i].author = newData.author;
			if(newData.releaseDate)
				db.books.list[i].releaseDate = newData.releaseDate;
			if(newData.isAvailable!=undefined)
				db.books.list[i].isAvailable = newData.isAvailable;
			if(newData.lendingList)
				db.books.list[i].lendingList = newData.lendingList;
			res.status(200).json({message: "Changed"});
			return;
		}
	}
	res.status(404).end("Page not found");
});
router.delete("/books",(req,res)=>{
	let id = JSON.parse(req.body.data);
	for (var i = db.books.list.length - 1; i >= 0; i--) {
		if(db.books.list[i].bookId==id){
			db.books.list.splice(i,1);
		}
	}

	res.status(200).render("list",{data:db.books.list});
	console.log(id);
	console.log(db.books.list);
});
router.post("/books",(req,res)=>{
	let newData = JSON.parse(req.body.data);
	db.books.lastId+=1;
	newData.bookId = db.books.lastId;
	newData.isAvailable = true;
	newData.lendingList = [];
	db.books.list.push(newData);
	res.status(200).json({message: "Added"});
});



router.get("*", (req,res) => {
	res.status(404);
	res.end("Page not found");
});
module.exports = router;