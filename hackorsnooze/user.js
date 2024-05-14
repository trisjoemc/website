"use strict";

// global to hold the User instance of the currently-logged-in user
let currentUser;

//User login/signup/login

/** Handle login form submission. If login ok, sets up the user instance */

async function login(evt) {
  console.debug("login", evt);
  evt.preventDefault();

  let $loginForm = $('#login-form');
  console.log($loginForm)

  // grab the username and password
  const username = $("#login-username").val();
  const password = $("#login-password").val();

  // User.login retrieves user info from API and returns User instance
  currentUser = await User.login(username, password);

  $loginForm.trigger("reset");

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
}

$loginForm.on("submit", login);

/** Handle signup form submission. */

async function signup(evt) {
  console.debug("signup", evt);
  evt.preventDefault();

  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();
  
  // User.signup retrieves user info from API and returns User instance
  currentUser = await User.signup(username, password, name);
  
  $signupForm.trigger("reset");

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
}

$signupForm.on("submit", signup);

//Remove their credentials from localStorage and refresh page

function logout(evt) {
  console.debug("logout", evt);
  localStorage.clear();
  location.reload();
}

$navLogOut.on("click", logout);

/** If there are user credentials in local storage, use those to log in
 * that user. 
 */

async function checkForRememberedUser() {
  console.debug("checkForRememberedUser");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;

  // try to log in with these credentials (will be null if login failed)
  currentUser = await User.loginViaStoredCredentials(token, username);
}

function saveUserCredentialsInLocalStorage() {
  console.debug("saveUserCredentialsInLocalStorage");
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

 // General UI stuff about users
 
async function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");
  hidePageComponents();

  putStoriesOnPage();

  $allStoriesList.show();
  generateUserProfile();
  updateNavOnLogin();

  $storiesContainer.show() 
}

function generateUserProfile() {
  console.debug('generateUserProfile');
  $('#profile-name').text(currentUser.name);
  $('#profile-username').text(currentUser.username);
  $('#profile-account-date').text(currentUser.createdAt.slice(0, 10));
}