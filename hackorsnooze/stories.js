"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  let showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
        <div>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <div class="story-author">by ${story.author}</div>
        <div class="story-user">posted by ${story.username}</div>
        </div>
      </li>
    `);
}

function getStartHTML(story, user) {
  let isFavorite = user.isFavorite(story);
  let starType = isFavorite ? 'fas' : 'far';
  return ` <span class = 'star'>
  <i class = '${starType} fa-star'></i>
  </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/* delete story */

async function deleteStory(evt) {
  console.debug ('deleteStory');

  let $closestLi = $(evt.target).closest('li');
  let storyId = $closestLi.attr('id');

  await storyList.removeStory(currentUser, storyId);

  await putUserStoriesOnPage();
}

/* submit new story */

async function submitNewStory(evt) {
  console.debug('submitNewStory');
  evt.preventDefault();

  /*info from form*/

  let title = $('#create-title').val();
  let url = $('#create-url').val();
  let author = $('#create-author').val();
  let username = currentUser.username;
  let storyData = {title, url, author, username};

   //create a new story instance 

   let newStory = new Story(storyData);

   // add the story to the storylist 
 
   await storyList.addStory(currentUser, newStory);
 
 
  // generate and prepend the story markup
  let $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  /* hide and reset form */

  $submitForm.slideUp('slow');
  $submitForm.trigger('reset');

}

$submitForm.on('submit', submitNewStory);

function putUserStoriesOnPage() {
  console.debug('putUserStoriesOnPage');

  $ownStories.empty();

  if (currentUser.ownStories.length === 0) {
    $ownStories.append('<h5>No stories added by user yet!</h5>');
  } else {
    for ( let story of currentUser.ownStories) {
      let $story = generateStoryMarkup( story, true);
      $ownStories.append($story);
    }
  }

  $ownStories.show();
}

/* favorite on page */

function putFavoritesListOnPage() {
  console.debug('putFavoritesListOnPage');

  $favoritedStories.empty();
  if(currentUser.favorites.length === 0) {
    $favoritedStories.append('<h5>No favorites added!</h5>');
  } else {
    for (let story of currentUser.favorites) {
      let $story = generateStoryMarkup(story);
      $favoritedStories.append($story);
    }
  }
  $favoritedStories.show();
}

/* favorite and unfavorite story */

async function storyFavorite(evt) {
  console.debug('storyFavorite');

  let $tgl = $(evt.target);
  let $closestLi = $tgl.closest('li');
  let storyId = $closestLi.attr('id');
  let story = storyList.stories.find(s => s.storyId === storyId);

  if ($tgl.hasClass('fas')) {
    await currentUser.removeFavorite(story);
    $tgl.closest('i').toggleClass('fas far');
  } else {
    await currentUser.addFavorite(story);
    $tgl.closest('i').toggleClass('fas far');
  }
}

$(document).on('click', '.star', storyFavorite);