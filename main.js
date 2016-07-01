$(document).ready(function() {
    var rec = new webkitSpeechRecognition();
        rec.continuous = true;
        rec.interimResults = false;
        rec.lang = 'ja-JP';

        var userSaid = function(str, s) {
            return str.indexOf(s) > -1;
        }

        rec.onresult = function(e) {
            for (var i = e.resultIndex; i < e.results.length; ++i) {
                if (e.results[i].isFinal) {
                        var str = e.results[i][0].transcript;
                        console.log('Recognised: ' + str);
                        $("#content").text(str)
                        if (userSaid(str, '上')) {
                            $('#box').css("background-color","red");
                            Game.arrow("上")
                        }else if (userSaid(str, '下')) {
                            $('#box').css("background-color","blue");
                            Game.arrow("下")
                        }else if (userSaid(str, '左')) {
                            $('#box').css("background-color","yellow");
                            Game.arrow("左")
                        }else if (userSaid(str, '右')) {
                            $('#box').css("background-color","green");
                            Game.arrow("右")
                        }
                    }
                }
            }

    rec.start();
    var ctx = document.getElementById("canv").getContext('2d');
    Game.initGame(ctx);


});