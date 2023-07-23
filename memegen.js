/** @format */

let textTop;
let textBottom;
let removeDiv;
let imgUrl;
const form = document.querySelector("#createMeme");
const memeContainer = document.querySelector("#meme-container");
console.log(form);

form.addEventListener("submit", function (event) {
	event.preventDefault();
	console.log("hi");
	textTop = document.getElementById("textTop").value;
	textBottom = document.getElementById("textBottom").value;
	imgUrl = document.getElementById("imgUrl").value;
	console.log(textTop, textBottom, imgUrl);

	let removeDiv = document.createElement("div");
	removeDiv.classList.add("red-cross");
	removeDiv.innerText = "X";
	removeDiv.style.color = "gray";
	removeDiv.addEventListener("click", function (event) {
		console.log(event.target.parentElement);
		event.target.parentElement.remove();
	});

	let makeMeme = Meme(textTop, textBottom, imgUrl);
	console.log(makeMeme);
	let meme = document.createElement("div");
	meme.appendChild(makeMeme.topText);
	meme.appendChild(makeMeme.bottomText);
	meme.appendChild(makeMeme.image);
	meme.appendChild(removeDiv);
	memeContainer.appendChild(meme);

	form.reset();
});

function remove(e) {
	e.target.parentElement.remove();
}

function Meme(top, bottom, img) {
	let topText = document.createElement("h2");
	let bottomText = document.createElement("h3");
	let image = document.createElement("img");
	topText.innerText = top;
	bottomText.innerText = bottom;
	image.src = img;
	return { topText, bottomText, image };
}
