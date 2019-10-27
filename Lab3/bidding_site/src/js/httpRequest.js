function sendRequest(dest, method,data,callback){
	var xhr = new XMLHttpRequest();
	xhr.open(method, dest, true);

	//Send the proper header information along with the request
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() { // Call a function when the state changes.
	    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
	        // Request finished. Do processing here.
	        if(callback)
	        	callback(this.responseText);
	    }
	}
	xhr.send("data="+JSON.stringify(data));
}