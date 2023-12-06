// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
let questionCount = 5;
let categoryCount = 6;
let needUrl = `https://jservice.io/api`;

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */


function getCategoryIds() {
  // replace with actual ajax call
  let ids = [];
  for (let i = 0; i < categoryCount; i++) {
    ids.push(Math.floor(Math.random() * (500 - 1) + 1));
  }
  return ids;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  let response = await fetch(`http://jservice.io/api/category?id=${catId}`);
    let data = await response.json();
    console.log(data); 
    return data
 
 /* return {
    title: `Category ${catId}`,
    clues: [
      {question: `Clue ${catId} Q1`, answer: `${catId} A1`, showing: null},
      {question: `Clue ${catId} Q2`, answer: `${catId} A2`, showing: null},
      {question: `Clue ${catId} Q3`, answer: `${catId} A3`, showing: null},
      {question: `Clue ${catId} Q4`, answer: `${catId} A4`, showing: null},
      {question: `Clue ${catId} Q5`, answer: `${catId} A5`, showing: null},
    ],
  }; */
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  showLoadingView();

  let categoryIds = getCategoryIds();
  categories = [];

  for (let id of categoryIds) {
    categories.push(await getCategory(id));
  }

  let html = "<thead><tr>";
  for (let category of categories) {
    html += `<th>${category.title}</th>`;
  }
  html += "</tr></thead><tbody>";

  for (let i = 0; i < questionCount; i++) {
    html += "<tr>";
    for (let category of categories) {
      let clue = category.clues[i];
      if (clue){
        console.log(clue);
      html += `<td>${clue.question}</td>`;
    } else {
      html += `<td>placeHolder</td>`;
    }
    }
    html += "</tr>";
}

html += "</tbody>";

 $("#table").html(html);

 hideLoadingView();
}
/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */
$(document).ready(function(){

  $(`#table`).on('click', 'td', function(evt) {
    handleClick(evt);
  });

  $(`#start`).on('click', function(){
    showLoadingView();
    setupAndStart();
  });
});

function handleClick(evt) {
 let $td = $(evt.target);
 let $tr = $td.closest('tr');
 let categoryIndex = $td.index();
 let clueIndex = $tr.index();

 let category = categories[categoryIndex];
 let clue = category.clues[clueIndex];
 console.log(clue);

 if (clue.showing === null) {
    $td.text(clue.question);
    clue.showing = "question";
 } else if (clue.showing === "question") {
    $td.text(clue.answer);
    clue.showing = "answer";
 }
}

async function handleButtonClick() {
  try {
      showLoadingView();
      await fillTable();
      $('#loadButton').text('Replay');
      hideLoadingView();
  } catch (err) {
      alert('Failed to load data. Please try again.');
      hideLoadingView();
  }
}

// Handle the button click to fill the table with categories & cells for questions.
$('#loadButton').on('click', handleButtonClick);

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  $('#loadingSpinner').show();
  let jeopardyBoard = $('#table');
  let start = $('#start');

  jeopardyBoard.hide();

  //loadingSpinner.show();

  start.prop('disabled', true);
  console.log(loadingSpinner);
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  let loadingSpinner = $('#loadingSpinner');
  let jeopardyBoard = $('#table');
  let start = $('#start');

  jeopardyBoard.show();

  loadingSpinner.hide();

  start.prop('disabled', false);

}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  console.log('showLoadingView')
  showLoadingView();
  await fillTable();
  //hideLoadingView();
}

//document.getElementById('start').addEventListener('click', setupAndStart);

//document.getElementById('table').addEventListener('click', handleClick);

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO