/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  for (let data of tweets) {
    let tweeterElement = createTweetElement(data);
    $('.tweet-container').append(tweeterElement);
  }
}

// Function to calculate the differece of current day to whne the tweet was created
const calculateDate = function(timestamp) {
  const days = Math.floor((new Date().getTime() - timestamp)/1000/60/60/24);
  if (days === 0) {
    return "Today";
  } else if ( days === 1) {
    return "1 day ago";
  } else {
    return `${days} days ago`
  }
}

// Function to create the tweet article element
const createTweetElement = function(tweet) {
  const { name, avatars, handle } = tweet.user;
  const { text } = tweet.content;
  const createdAt  = calculateDate(tweet.created_at) 

  let $tweet = `
  <article>
    <section class="tweet-header">
      <div class="profile">
        <div class="avatar"><img src="${avatars}"></div>
        <div class="name">${name}</div>
      </div>
      <div class="handle">${handle}</div>
    </section>
    <div class="content-text">${escape(text)}</div>
    <section class="tweet-footer">
      <div class="created_at">${createdAt}</div>
      <div class="icons"><span><img class="footer-img" src="images/flag.png"></span><span><img class="footer-img" src="images/retweet.png"></span><span><img class="footer-img" src="images/heart.png"></span></div>
    </section>
  </article>
  `
  return $tweet;
}

// Function to send the tweet to the server
const sendTweetToServer = (tweetText) => {
  $.ajax({
    url: "/tweets",
    method: "POST",
    data: tweetText
  })
    .then(res => {
      loadtweets();
      $('textarea').val('');
    })
    .catch(err => console.log(err))
  }

  // Function to normalize the text and avoid XSS Attacks
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Function to reload the tweets on the page
const loadtweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET"
  })
  .then(res => {
    $('.tweet-container').empty()
    renderTweets(res);
  });
}
  
// Load all page content when DOM document is ready
$( document ).ready(function() {
  
  $('#tweet-form').submit(function(event) {

    event.preventDefault()
    const tweetText = $('form').serialize();
    const tweetTextLength = $(this).find('textarea').val().length;

    console.log("--->",escape(tweetText));

    $('#user-messages').slideUp();

    if (tweetTextLength === 0 || tweetTextLength === undefined) {
      $('#user-messages').html("&#9888; Blank tweets are not allowed. &#9888;")
      $( '#user-messages' ).slideDown()
    } else if (tweetTextLength > 140) {
      $('#user-messages').html("&#9888; Too Long. Please respect the limit of 140 characters &#9888;")
      $('#user-messages').slideDown();
    } else {
      sendTweetToServer(tweetText)
      loadtweets();
    }
  });
  $('#user-message').slideUp();
  loadtweets();
});
