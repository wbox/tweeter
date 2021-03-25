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

const createTweetElement = function(tweet) {

  const { name, avatars, handle } = tweet.user;
  const { text } = tweet.content;
  const createdAt  = new Date() - new Date(tweet.created_at);

  let $tweet = `
  <article>
    <section class="tweet-header">
      <div class="profile">
        <div class="avatar"><img src="${avatars}"></div>
        <div class="name">${name}</div>
      </div>
      <div class="handle">${handle}</div>
    </section>
    <div class="content-text">${text}</div>
    <section class="tweet-footer">
      <div class="created_at">${createdAt}</div>
      <div class="icons"><span><img class="footer-img" src="images/flag.png"></span><span><img class="footer-img" src="images/retweet.png"></span><span><img class="footer-img" src="images/heart.png"></span></div>
    </section>
  </article>
  `
  return $tweet;
}


const sendTweetToServer = (tweetText) => {
  $.ajax({
    url: "/tweets",
    method: "POST",
    data: tweetText
  })
    .then(res => {
      loadtweets();
    })
    .catch(err => console.log(err))
  }

  const validateTweetText = (tweetText) => {
    const tweetTextLength = $('textarea').val().length;

    console.log("lenght", $('textarea').val().length);
  }

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

$( document ).ready(function() {
  $('#tweet-form').submit(function(event) {

    event.preventDefault()
    const tweetText = $('form').serialize()

    console.log($(this).length)
    const tweetTextLength = $(this).find('textarea').val().length;
    console.log("--->", tweetTextLength);

    if (tweetTextLength === 0 || tweetTextLength === undefined) {
      alert("You need to type your text before tweeting!"); 
    } else if (tweetTextLength > 140) {
      alert("Your tweet can have up to 140 characters!");
    } else {
      sendTweetToServer(tweetText)
      //loadtweets();
    }
  });
  loadtweets();
});




