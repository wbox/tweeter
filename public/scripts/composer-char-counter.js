$(document).ready( function() {
  
  $("#tweet-text").on('input', function (e) {
    let tweetVal = 140 - $("#tweet-text").val().length;
    console.log('tweetval', tweetVal);
    if (tweetVal < 0) {
      $('.counter').css('color','red');
    }
    $('.counter').text(tweetVal);
  })

})