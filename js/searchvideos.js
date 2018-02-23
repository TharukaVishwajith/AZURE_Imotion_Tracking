function search() {
    if(searchfor == ""){
        searchfor = "new songs";
    }
        var params = {
            // Request parameters
            "q": searchfor,
            "count": "50",
            "offset": "0",
            "mkt": "en-us",
            "safeSearch": "Moderate",
        };
      
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/videos/search?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","bcd9007d0cad4994be41dcf1233cb29c");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
           // alert("success");
            createPlayList(data);
           // var text = JSON.stringify(data);
           // var list = data.getElementsByTagName("value");
          
          
        })
        .fail(function() {
            alert("error");
        });
}

 function createPlayList(data){
        document.getElementById("content").innerHTML = "";
         for (var i = 0 ; i <= data.value.length; i++) {
            var str = data.value[i].embedHtml;
            var s = str.indexOf("src");
            var e = str.indexOf("?");
            var res = str.substr(s+5, e-39);

            var para = document.createElement("iframe");
            para.src = res;
            var element = document.getElementById("content");
            element.appendChild(para);
           // para = document.createElement("br");
          //  element.appendChild(para);
            
          //  document.getElementById("content").innerHTML = data.value[0].embedHtml;
           // document.getElementById("content").innerHTML = document.getElementById("content").innerHTML + "<br>"+res;
           }
    }