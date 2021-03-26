// Count characters inside the textarea and reacts 
// on the page based on the rules of min and max
// characters allowed
$(document).ready( function() {
  
  $("#tweet-text").on('input', function (e) {
    let tweetVal = 140 - $("#tweet-text").val().length;
    $('#user-messages').slideUp();
    if (tweetVal < 0) {
      $('.counter').css('color','red');
    } else {
      $('.counter').css('color','#545149');
    }
    $('.counter').text(tweetVal);
  })
})
