function titleHandler() {
	
	const linksArray = Array.from(document.querySelectorAll(".title_page > div"));
	const [mainPageLink, infoPageLink, firstTestPageLink] = linksArray;

	document.addEventListener("click", function(e) {
	
		if (e.target == mainPageLink) {
		
			window.open("./html/IQ-test_main.html#general", "_self");
		} else if (e.target == infoPageLink) {
			
			window.open("./html/IQ-test_main.html#info", "_self");
		} else if (e.target == firstTestPageLink) {
		
			window.open("./html/IQ-test_test.html", "_self");
		}
	});
}

titleHandler();



