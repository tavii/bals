$(function(){
  window.AudioContext = window.AudioContext || window.webkitAudioContext;


  var recognition = new webkitSpeechRecognition();
  recognition.lang = 'ja';

  var tweet = function(text) {
    var base = "https://twitter.com/intent/tweet?";
    var params = {
      url: "http://tavii.github.io/bals/",
      text: text,
      hashtags: "#バルス #さけぶ"
    };

    var param = $.param(params);
    $('#tweet-btn').attr('href', base + param);
  }

  var runFlash = function(){
    $("#target-img").css("opacity", "0.1");
    $("#target-img").css("filter", "alpha(opacity=10)");
    $("#target-img").fadeTo("middle", 1.0);
  }
  

  $('#bals-btn').on('click',function(){
    recognition.start();
    $(this).parent().find('span').removeClass('hide');
    $('#bals-btn').attr('disabled', true);
  });

  // input
  recognition.addEventListener('result', function(event){
    var a = 'バルス'
    var input = event.results.item(0).item(0).transcript;

    if (a == input) {

      $('#target-img').removeClass('hide');
      $('#tweet-btn').removeClass('hide');
      tweet('パソコンに向かって「バルス」を叫ぼう！');

      var target = document.getElementById("tweet-btn");
    // target.click();

      runFlash();

    }

  });

  $('#message').textAnimation({
    speed: 200,
    delay: 100
  });

});
