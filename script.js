
$(document).ready(function(){

	//max result count is 10
	const apiURL = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=10";
	const key = "YOUR_API_KEY_HERE";
	//page elements
	const $quote = $('#quote');
	const $author = $('#author');
	const $more = $('#more');
	// To identify which quote is being served
	let currentQuoteIndex = 0;
	// 10 item quote JSON data
	let quoteObj = {};

	// More btn click event handler
	$($more).on('click', function(){

		// if the index is 0
		// ie - no more new quotes in the quoteObj
		// hit the api and get more quotes
		if (currentQuoteIndex === 0){
			// GET JSON from API
			getQuoteJsonData();
		} else {
			// server next quote
			handleData(quoteObj);
		}

	}); // End of more click handler

	// if spacebar is pressed ...
	$(window).keydown(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
    	// don't scroll down
      e.preventDefault(); 
      // If no more quotes
  		if (currentQuoteIndex === 0){
				// GET JSON from API
				getQuoteJsonData();
			} else {
				// server next quote
				handleData(quoteObj);
			}
    }
  });

	// Gets JSON data from the Mashape API
	function getQuoteJsonData() {

		$.ajax({
			type : 'GET',
			url : apiURL,
			success : function(data){
					quoteObj = data;
					//call handleData function here
					handleData(quoteObj);
				}, 
				error : function(e){
					console.log('GET Request Failed');
				},
				//custom for Mashape APIs
				beforeSend : function(xhr) {
					xhr.setRequestHeader("X-Mashape-Authorization", key);
				}
			}); // end of AJAX

	}; // End of geQuoteJsonData()

	// Handles the JSON data
	// Gets the obj with 10 items
	// currentQuoteIndex => current quote being served to the page
	// data => JSON obj with 10 items
	function handleData(data){

		if(currentQuoteIndex === 10){

			// if the index is 10, reset it to 0
			currentQuoteIndex = 0;
			// and get new set of quotes, hit the API
			getQuoteJsonData();

		} else {

			let quoteText = data[currentQuoteIndex].quote;
			let quoteAuthor = data[currentQuoteIndex].author;
			let quoteAuthorUrlReady = quoteAuthor.replace(' ', '+');
			//final output = googleUrl + quoteAuthorUrlReady 
			// wrapped in an anchor tag
			let googleUrl = '<a href="'+ 
											'https://www.google.com/search?q=' + 
											quoteAuthorUrlReady + 
											'" target="_blank">' + 
											quoteAuthor + 
											'</a>';

			//write quote to the page
			$quote.text(quoteText);
			//write author to the page
			$author.html(googleUrl);

			// Increment to server the next index
			currentQuoteIndex++;

		} // end of if ... else statement

	}; // end of handleData()

}); // end of doc ready
