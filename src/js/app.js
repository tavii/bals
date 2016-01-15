$(function(){
  var recognition = new webkitSpeechRecognition();
  recognition.lang = 'ja';

  // input
  recognition.addEventListener('result', function(event){
    var a = 'バルス'
    var input = event.results.item(0).item(0).transcript;

    if (a == input) {
      console.log('barusu')
      $('#target-img').removeClass('hide');
    }
  });

  recognition.start();
});
