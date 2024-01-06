/** @format */

const input = document.querySelector("#fruit");
const suggestions = document.querySelector(".suggestions ul");

const fruit = [
	"Apple",
	"Apricot",
	"Avocado 🥑",
	"Banana",
	"Bilberry",
	"Blackberry",
	"Blackcurrant",
	"Blueberry",
	"Boysenberry",
	"Currant",
	"Cherry",
	"Coconut",
	"Cranberry",
	"Cucumber",
	"Custard apple",
	"Damson",
	"Date",
	"Dragonfruit",
	"Durian",
	"Elderberry",
	"Feijoa",
	"Fig",
	"Gooseberry",
	"Grape",
	"Raisin",
	"Grapefruit",
	"Guava",
	"Honeyberry",
	"Huckleberry",
	"Jabuticaba",
	"Jackfruit",
	"Jambul",
	"Juniper berry",
	"Kiwifruit",
	"Kumquat",
	"Lemon",
	"Lime",
	"Loquat",
	"Longan",
	"Lychee",
	"Mango",
	"Mangosteen",
	"Marionberry",
	"Melon",
	"Cantaloupe",
	"Honeydew",
	"Watermelon",
	"Miracle fruit",
	"Mulberry",
	"Nectarine",
	"Nance",
	"Olive",
	"Orange",
	"Clementine",
	"Mandarine",
	"Tangerine",
	"Papaya",
	"Passionfruit",
	"Peach",
	"Pear",
	"Persimmon",
	"Plantain",
	"Plum",
	"Pineapple",
	"Pomegranate",
	"Pomelo",
	"Quince",
	"Raspberry",
	"Salmonberry",
	"Rambutan",
	"Redcurrant",
	"Salak",
	"Satsuma",
	"Soursop",
	"Star fruit",
	"Strawberry",
	"Tamarillo",
	"Tamarind",
	"Yuzu",
];
const re = /[A-Z]/;

function search(str) {
	let results = [];
	//console.log(fruit.search);
	//console.log(search(/fruit/g));
	//console.log('about to search for', str);

	results = fruit.filter((word) => {
		let lower = word.toLowerCase();
		let s = str.toLowerCase();
		return lower.includes(s);
	});
	return results;
}

function searchHandler(e) {
	console.log(input.value);
	let results = search(input.value);

	console.log(results);

	showSuggestions(results, input.value);
}

function showSuggestions(results, inputVal) {
	let ul = document.getElementById("list");

	ul.innerHTML = "";

	for (let result of results) {
		let option = document.createElement("li");
		option.appendChild(document.createTextNode(result));
		//console.log(option);
		ul.appendChild(option);
	}
}

function useSuggestion(e) {
	let selectSuggestion = e.target.innerText;

	input.value = selectSuggestion;
	suggestions.innerHTML = "";
}

input.addEventListener("keyup", searchHandler);
suggestions.addEventListener("click", useSuggestion);
