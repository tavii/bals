$(function(){
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  var soundBuffer = null;
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();


  function loadDogSound(path) {
    var url = location.origin + location.pathname + path;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        soundBuffer = buffer;
      }, function(){});
    }
    request.send();
  }


  function playSound(buffer) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
  }


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

  var answers = [
    {
      image: "img/1.jpg",
      audio: "audio/1.mp3"
    },
    {
      image: "img/2.jpg",
      audio: "audio/2.mp3"
    },
    {
      image: "img/3.jpg",
      audio: "audio/3.mp3"
    },
    {
      image: "img/4.jpg",
      audio: "audio/4.mp3"
    }
  ]

  var randnum = Math.floor( Math.random() * 4 );
  var answer = answers[randnum];
  loadDogSound(answer.audio);


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

      playSound(soundBuffer);
      $('#target-img').attr('src', answer.image);

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
