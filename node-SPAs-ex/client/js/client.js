"use strict";

const classNames = ["null", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

/*
 * Returns the tens (if type=="tens") or ones (if type != "tens") digit of
 * an integer. As an example, 56 will return 5 when called as getDigit(56,"tens")
 * and 6 when called as getDigit(56,"ones").
 */
function getDigit(n, type) {
	console.assert(typeof (n) == "number", "Expecting a number");
	if (type == "tens")
		return parseInt(n / 10);
	else
		return parseInt(n % 10);
}

/*
 * With a given selector the correct div elements are selected;
 * they should display number n. 
 * The last argument (tens) tells us whether we look at the tens
 * or ones position.
 */
function setNumberClass(n, selector) {
	let selected = document.querySelector(selector);
	let classList = selected.classList;

	while (classList.length > 0) {
		classList.remove(classList.item(0));
	}

	let keyword = "ones";
	if (selector.includes("tens")) {
		keyword = "tens";
	}

	classList.add(keyword);
	classList.add(classNames[getDigit(n, keyword)]);
}

/*
 * The commented code below shows how to update the time based on just
 * client-side JavaScript. No input from the server required.
 */
/*
window.addEventListener('load', function (e) {
	//every second, we update the clock
	window.setInterval(function (e) {
		let date = new Date();//retrieve current time/date
		let HH = date.getHours();
		let MM = date.getMinutes();
		let SS = date.getSeconds();
		setNumberClass(HH, "#hours .tens");
		setNumberClass(HH, "#hours .ones");
		setNumberClass(MM, "#minutes .tens");
		setNumberClass(MM, "#minutes .ones");
		setNumberClass(SS, "#seconds .tens");
		setNumberClass(SS, "#seconds .ones");
	}, 1000);
});
*/

window.addEventListener('load', function (e) {
	window.setInterval(function (e) {
		axios.get('/getTime')
			.then(function (res) {
				let date = new Date(res.data);
				let HH = date.getHours();
				let MM = date.getMinutes();
				let SS = date.getSeconds();
				setNumberClass(HH, "#hours .tens");
				setNumberClass(HH, "#hours .ones");
				setNumberClass(MM, "#minutes .tens");
				setNumberClass(MM, "#minutes .ones");
				setNumberClass(SS, "#seconds .tens");
				setNumberClass(SS, "#seconds .ones");

				document.getElementsByTagName("footer")[0].dataset.serverSync = date;
			})
			.catch(function (err) {
				//error
				console.log(err);
			});
	}, 1000);
})

window.addEventListener('mousemove', function (e) {
	let pointer = document.getElementById("pointer");
	console.log(e.offsetX);
	console.log(e.offsetY);
	const spotlightRadius = 25;
	pointer.style.top = (e.clientY - spotlightRadius) + "px";
	pointer.style.left = (e.clientX - spotlightRadius) + "px";
});

window.addEventListener('mouseout', function (e) {
	let pointer = document.getElementById("pointer");
	pointer.style.top = "-100px";
	pointer.style.left = "-100px";
})

