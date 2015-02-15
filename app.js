var mp3file
window.addEventListener("load", function() {

    //audio要素に曲名をセット
    mp3file = $("input[name='songSelect']:checked").val();
    if (!mp3file){ mp3file = "ageage_01.mp3" };
    $("#mainAudio").attr("src","audio/"+mp3file);

    $("#statusTxt").text("接続中...");
    loadApi();

    var sid = setInterval( loadApi,1000 );

    /*
    $("#bigButton").on("touchend",function(){
        stopSound();
    });
    */

});

/*
for (var i in songs){
    var o = songs[i];
    var text = o.text;
    $("#main").append("<label><input type='radio' name='songSelect' value=\"" + o.filename + "\">" + text + "</label>");
}
*/

function loadApi(){

  var dataUrl = "http://192.168.1.20:8080/api/getCSC";

  var req = new XMLHttpRequest({mozSystem: true});
  req.open('GET', dataUrl, true);
  req.onreadystatechange = function(aEvt){
      if(req.readyState == 4){
          if(req.status == 200){
              //console.log(req.responseText);
              dataSuccess(JSON.parse(req.responseText));
          }else{
              //console.log("NG",req.status);
              dataError(req.status);
          }
      }
  };
  req.send(null);

}
 
function dataSuccess(data){
    $("#statusTxt").text("接続済み");
    $("#statusMark").addClass("active");
    $("#bigButton").removeClass("connecting");
    $("#bigButton").addClass("player");
    $("#resData").text(data.speed);
    if(data.speed > 2 ){
    //if(data.speed >= 0 ){
        playSound();

    }else{
        stopSound();

    }
}
function dataError(errstat){
    $("#statusTxt").text("接続エラー");
    $("#statusMark").removeClass("active");
    $("#bigButton").removeClass("connecting player stop");
    $("#resData").text("status: "+ errstat);
}

function playSound(){
    if(! $("#bigButton").hasClass("stop")){
        mainAudio.play();
        $("#bigButton").addClass("stop");
    }
}
function stopSound(){
    mainAudio.pause();
    $("#bigButton").removeClass("stop");
}

