const progress = document.querySelector("#progress");
let answerPicked = false;
let countdownId;
let outputData = {};

pickAnswer();
nextBtnHandler();
callBtnHandler();

function nextBtnHandler() {
	
	const nextButton = document.querySelector(".next_btn");
	const mainBlock = document.querySelector("#main");
	const footer = document.querySelector("#footer");
	
	nextButton.addEventListener("click", function() {

		if ( answerPicked ) {

			const progressValue = ++progress.querySelector("progress").value;
		
			if (progressValue == 12) {
			
				footer.style.display = "none";
				waitHandler(progressValue, mainBlock);
			} 
		
			answerPicked = false;
			mainBlock.style.transform = `translateX(-${7.69231 * (progressValue-1)}%)`;
			pickAnswer();
		}
	});
}

function pickAnswer() {
	
	const testPageArray = Array.from( document.querySelectorAll(".test_page") );
	const index = progress.querySelector("progress").value - 1;
	const currentPage = testPageArray[index];
	
	currentPage.addEventListener("click", function(e) {

		const currentInput = e.target.closest(".input");
		const currentBlock = e.target.closest(".square_block");
		const currentAnswerOption = e.target.closest(".answer_option");	
			
		if ( currentInput ) {
				
			const inputArray = Array.from( currentPage.querySelectorAll(".input") );
			inputArray.forEach(item => item.classList.remove("input_active"));
			currentInput.classList.add("input_active");
			answerPicked = true;
			fillDataObject(index, currentInput, currentBlock, currentAnswerOption);
		}

		if ( currentBlock ) {
			const blockArray = Array.from( currentPage.querySelectorAll(".square_block") );
			blockArray.forEach(item => item.classList.remove("block_active"));
			currentBlock.classList.add("block_active");
			answerPicked = true;
			fillDataObject(index, currentInput, currentBlock, currentAnswerOption);
		}

		if ( currentAnswerOption ) {
			const answerOptionArray = Array.from( currentPage.querySelectorAll(".answer_option") );
			answerOptionArray.forEach(item => item.classList.remove("block_active"));
			currentAnswerOption.classList.add("block_active");
			answerPicked = true;
			fillDataObject(index, currentInput, currentBlock, currentAnswerOption);
		}
	});
}

function waitHandler(progressValue, mainBlock) {
	
	const wait = document.querySelector(".wait_main");
	let currentTime = 0;
	const endTime = Math.floor(Math.random()*10 + 10);
	let turnNumber = 1;
	
	let waitId = setInterval(function() {
		
		wait.style.opacity = "1";
		wait.style.transform = `rotate(${-360*turnNumber}deg)`;
		turnNumber++;
		currentTime++;
		document.querySelector(".main_thinking_style > div").textContent += " .";
		
		if (currentTime == endTime) {
			clearInterval(waitId);
			waitId = undefined;
			mainBlock.style.transform = `translateX(-${7.69231 * progressValue}%)`;
			progress.style.display = "none";
			document.querySelector(".title").classList.add("ready");
			document.querySelector(".title").textContent = "Готово!";
			document.querySelector("body").style.overflowY = "auto";
			startCountdown();
		}
	},1000);
}

function startCountdown() {
	
	setTimeout(function() {
		
		let date = new Date();
		date.setMinutes(10,00);
	
		countdownId = setInterval(function() {
			date = new Date(date-1000);
		
			let minutes = date.getMinutes();
			let seconds = date.getSeconds();
		
			document.querySelector(".minutes").textContent = minutes;
			document.querySelector(".seconds").textContent = (String(seconds).length == 2) ? seconds : "0" + seconds;
		
			if (minutes == 0 && seconds == 0) {
				clearInterval(countdownId);
				countdownId = undefined;
				callBtn.style.display="none";
			}
		}, 1000)},
	1000);
}

function callBtnHandler() {
	
	const callBtn = document.querySelector(".call_btn");
	const inputDataBlock = document.querySelector(".jsonData");
	
	callBtn.addEventListener("click", function() {
		if (countdownId) {
			inputDataBlock.style.display = "block";
			receiveData(inputDataBlock);
			clearInterval(countdownId);
			countdownId = undefined;
		}
	});
}

function fillDataObject(index, currentInput, currentBlock, currentAnswerOption) {
	
	let dataText;
	let colorBlock;
	let numberBlock;
	
	if (currentInput) {
		dataText = currentInput.querySelector(".input_text").textContent;
	}
	
	if (currentBlock && currentBlock.classList.contains("square_block")) {
		colorBlock = getComputedStyle(currentBlock).backgroundColor;
	}
	
	if (currentAnswerOption && currentAnswerOption.classList.contains("answer_option")) {
		numberBlock = currentAnswerOption.querySelector("div").textContent;
	}
	
	switch (index) {
		case(0): outputData.sex = dataText;
		break;
		case(1): outputData.age = dataText;
		break;
		case(2): outputData.redundant = dataText;
		break;
		case(3): outputData.next_number = dataText;
		break;
		case(4): outputData.color_first = colorBlock;
		break;
		case(5): outputData.color_second = colorBlock;
		break;
		case(6): outputData.redundant_city = dataText;	
		break;
		case(7): outputData.correct_figure = numberBlock;	
		break;
		case(8): outputData.common_habit = dataText;		
		break;
		case(9): outputData.figure_definition = dataText;		
		break;
		case(10): outputData.star_number = numberBlock;
		break;
	}
}

function receiveData(inputDataBlock) {

	const promise = fetch("https://swapi.dev/api/people/1/");
	
	promise
		.then(response => {
			if (response.ok) {
				return response.json();
		}})
		.then(json => renderJSON(json, inputDataBlock))
		.catch(error => console.log(error));
}

function renderJSON(json, inputDataBlock) {
	document.body.style.height = "inherit";
	for (let key in json) {
		
		let textArray = "[";
		if (Array.isArray(json[key])) {
			json[key].forEach(item => {textArray += item + ", "});
			textArray += "]";
			inputDataBlock.innerHTML += `<span>${key} : ${textArray};</span><br>`;
		} else {
			inputDataBlock.innerHTML += `<span>${key} : ${json[key]};</span><br>`;
		}
	}
}