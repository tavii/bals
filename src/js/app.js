$(function(){
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  var soundBuffers = [];
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();


  function loadDogSound(path, key) {
    var url = location.origin + location.pathname + path;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        soundBuffers[key] = buffer;
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
      hashtags: "バルス #さけぶ #ラピュタ"
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
    },
    {
      image: "img/5.jpg",
      audio: "audio/5.mp3"
    }
  ]

  var randnum = Math.floor( Math.random() * 4 );



  loadDogSound(answers[0].audio, 0);
  loadDogSound(answers[1].audio, 1);
  loadDogSound(answers[2].audio, 2);
  loadDogSound(answers[3].audio, 3);
  loadDogSound(answers[4].audio, 4);


  $('#bals-btn').on('click',function(){
    recognition.start();
    $(this).parent().find('span').removeClass('hide');
    $('#bals-btn').attr('disabled', true);
  });

  // input
  recognition.addEventListener('result', function(event){
    var a = "バルス";
    var input = event.results.item(0).item(0).transcript;

    if (a == input) {
      randnum = 4;
    }
    var answer = answers[randnum];
    playSound(soundBuffers[randnum]);
    $('#target-img').attr('src', answer.image);
    tweet('パソコンに向かって「バルス」を叫ぼう！');
    $('#result').removeClass('hide');
    $('#bals-btn').attr('disabled', false);

  });

  $('#message').textAnimation({
    speed: 200,
    delay: 100
  });

  $('#resound').on('click',function(){
      playSound(soundBuffers[randnum]);
  });

});
