var anger;
var contempt;
var disgust;
var fear;
var happiness;
var neutral;
var sadness;
var surprise;

var searchfor = "";

function SaveSnap(){
    document.getElementById("loading").innerHTML="Analyzing, please wait...";
    var file = document.getElementById("base64image").src.substring(23).replace(' ', '+');
  var img = Base64Binary.decodeArrayBuffer(file);
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", function(event) { drawChart(event);}, false);
    ajax.open("POST", "https://api.projectoxford.ai/emotion/v1.0/recognize","image/jpg");
  ajax.setRequestHeader("Content-Type","application/octet-stream");
  //ajax.setRequestHeader("Accept-Encoding","gzip, deflate");
  ajax.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml");
  ajax.setRequestHeader("Ocp-Apim-Subscription-Key","a15ddd0307b440e4b41eb93ee56bd48e");
  ajax.send(img);
}

function uploadcomplete(event){
    document.getElementById("loading").innerHTML="Compleated";
  var xmlDoc=event.target.responseXML;
  var list = xmlDoc.getElementsByTagName("scores");
  document.getElementById("anger").innerHTML = list[0].childNodes[0].textContent;
  document.getElementById("contempt").innerHTML = list[0].childNodes[1].textContent;
  document.getElementById("disgust").innerHTML = list[0].childNodes[2].textContent;
  document.getElementById("fear").innerHTML = list[0].childNodes[3].textContent;
  document.getElementById("happiness").innerHTML = list[0].childNodes[4].textContent;
  document.getElementById("neutral").innerHTML = list[0].childNodes[5].textContent;
  document.getElementById("sadness").innerHTML = list[0].childNodes[6].textContent;
  document.getElementById("surprise").innerHTML = list[0].childNodes[7].textContent;
}


 function drawChart(event) {
  uploadcomplete(event);
   document.getElementById("loading").innerHTML="Compleated";
  var xmlDoc=event.target.responseXML;
  var list = xmlDoc.getElementsByTagName("scores");
    anger = formatData(list[0].childNodes[0].textContent);
    contempt = formatData(list[0].childNodes[1].textContent);
    disgust= formatData(list[0].childNodes[2].textContent);
    fear = formatData(list[0].childNodes[3].textContent);
    happiness = formatData(list[0].childNodes[4].textContent);
    neutral = formatData(list[0].childNodes[5].textContent);
    sadness = formatData(list[0].childNodes[6].textContent);
    surprise = formatData(list[0].childNodes[7].textContent);

    selectSearch();

    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: "Emotion Report"
      },
      data: [

      {
        dataPoints: [
        { x: 10, y: anger, label: "anger"},
        { x: 20, y: contempt,  label: "contempt" },
        { x: 30, y: disgust,  label: "disgust"},
        { x: 40, y: fear,  label: "fear"},
        { x: 50, y: happiness,  label: "happiness"},
        { x: 60, y: neutral, label: "neutral"},
        { x: 70, y: sadness,  label: "sadness"},
        { x: 80, y: surprise,  label: "surprise"}
        ]
      }
      ]
    });

    chart.render();
    anger = 0;
    contempt = 0;
    disgust = 0;
    fear = 0;
    happiness = 0;
    neutral = 0;
    sadness = 0;
    surprise = 0;
  }

function formatData(data){
    if(data < 0.01 ){
      data = 0;
    }else if(data >= 0.99){
      data = 0.99
    }
    return data*100;
}


function drawChart0() {
 
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: "Emotion Report"
      },
      data: [

      {
        dataPoints: [
        { x: 10, y: 0, label: "anger"},
        { x: 20, y: 0,  label: "contempt" },
        { x: 30, y: 0,  label: "disgust"},
        { x: 40, y: 0,  label: "fear"},
        { x: 50, y: 0,  label: "happiness"},
        { x: 60, y: 0, label: "neutral"},
        { x: 70, y: 0,  label: "sadness"},
        { x: 80, y: 0,  label: "surprise"}
        ]
      }
      ]
    });

    chart.render();
  }

function selectSearch(){

  if (sadness > 0 && sadness > happiness) {
    searchfor = "sad songs";
  }else if(happiness > 0 && anger == 0){
    if(happiness > neutral ){
      searchfor = " love songs";
    }else{
      searchfor = "hit songs"
    }
  }else if(anger > 0){
    searchfor = "relaxing music";
  }else if(neutral > 80){
    searchfor = "classical songs";
  }
}

