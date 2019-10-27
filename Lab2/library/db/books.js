module.exports = {
	"lastId": 2,
	"list":
			[
				{
					"bookId":0,
					"bookName": "Book 1",
					"author": "Author 1",
					"releaseDate": "09/1999",
					"isAvailable": true,
					"lendingList": [{
						"name": "A",
						"lendingDate": "12/12/2012",
						"dueDate": "12/12/2012",
						"returnDate": "12/12/2012"
					}]
				},
				{
					"bookId":1,
					"bookName": "Book 2",
					"author": "Author 2",
					"releaseDate": "09/1996",
					"isAvailable": false,
					"lendingList": [{
						"name": "B",
						"lendingDate": "12/12/2012",
						"dueDate": "12/12/2012",
						"returnDate": "11/01/2017"
					}]
				},
				{
					"bookId":2,
					"bookName": "Book 3",
					"author": "Author 3",
					"releaseDate": "09/2011",
					"isAvailable": true,
					"lendingList": []
				}
			]
}