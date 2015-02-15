window.addEventListener("load", function() {
    $("#statusTxt").text("接続中...");
    loadApi();

    //loaded event
    $("#bigButton").on("touchend",function(){
        //console.log($("input[name='songSelect']:checked").val());
        
        //つながってない時
        if(! $("#mainAudio").hasClass("player")){

            //つなげに行く
            loadApi();

        //準備完了の時
        }else if($("#mainAudio").hasClass("stop")){

            //audio要素に曲名をセット
            $("#mainAudio").attr("src","audio/"+$("input[name='songSelect']:checked").val());
            mainAudio.play();

        }else if($("#mainAudio").hasClass("stop")){
            mainAudio.pause();
        }
    });
});

for (var i in songs){
    var o = songs[i];
    var text = o.text;
    $("#main").append("<label><input type='radio' name='songSelect' value=\"" + o.filename + "\">" + text + "</label>");
}

function loadApi(){

  $("#bigButton").addClass("connecting");

  var dataUrl = "http://192.168.1.20:8080/api/getCSC";

  var req = new XMLHttpRequest({mozSystem: true});
  req.open('GET', dataUrl, true);
  req.onreadystatechange = function(aEvt){
      if(req.readyState == 4){
          if(req.status == 200){
              console.log(req.responseText);
          }else{
              console.log("NG",req.status);
          }
      }else{
          console.log("error");
      }
  };
  req.send(null);

}
 


