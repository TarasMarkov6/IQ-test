function mainPageHandler() {
	
	const mainPage = document.querySelector(".main_page");
		
	mainPage.addEventListener("click", function(e) {

		let [btn1, btn2, btn3] = Array.from( mainPage.querySelectorAll("button") );

		if ( e.target == btn1 || e.target == btn2 || e.target == btn3 ) {
		
			window.open("../html/IQ-test_test.html", "_self");
		} else if ( e.target.closest(".arrow") ) {
			
			window.open("../html/IQ-test_main.html#info", "_self");
		}
	});
}

mainPageHandler();




