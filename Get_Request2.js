function createXMLHttpRequest() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest({ mozSystem: true })
    } else if (window.ActiveXObject) {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {
            try {
                new ActiveXObject("Microsoft.XMLHTTP")
            } catch (e2) {
                return null
            }
        }
    } else {
        return null
    }
}
function toSource( elm ){
    //http://www.ninxit.com/blog/2010/01/31/localstorage-%E3%81%A7%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E8%A8%AD%E5%AE%9A%E3%81%AE%E7%AE%A1%E7%90%86/
    var out = '';
    for( var key in elm ){
        if( out != '' ) out += '&';
        out += key + "=" + elm[key];
    }
    return out;
}
//送信ボタンが押されたときの処理
function send_get() {
    var url = "http://ip.jsontest.com";
    post_or_get_string(url, "GET", "", "", function(sucsess, res_text){
        if(sucsess != false){
            var result = document.getElementById("result_get");
            var text = document.createTextNode(decodeURI(res_text));
            if ("" !== text && null != text) {
                result.appendChild(text);
            }
        }
    });
}
/*use like thie.
//var Content_Type = { "type" : "audio/wav" };
//var param_obj = {key : value};
//get_audio_from_URL("http://example.com", param_obj, Content_Type, funcion(sucsess, audio){
    audio.play();
});
*/
var get_audio_from_URL = function(url, param_obj, Content_Type, callback){
    console.log("function 'new_audio_from_URL' are called");
    post_or_get_string(url, "POST", param_obj, "arraybuffer", function(sucsess, res_text){
        if(sucsess != false){
            var view = new Uint8Array(res_text);
            var blob = new Blob([view], Content_Type);
            var temp_url_for_play = window.URL || window.webkitURL;
            var audio = new Audio(temp_url_for_play.createObjectURL(blob));
            callback(true, audio);
        }
        callback(false);
    });
}
var post_or_get_string = function (url, method, param_obj, responseType, callback) {
    //http://www.gesource.jp/programming/javascript/20060509.html
    console.log("function 'post_or_get_string' are called");
    //POSTかGETじゃないならエラー
    if ("POST" != method && "GET" != method) {
        console.log("err: Function 'post_or_get_string' receive an incorrect value");
        return null;
    }
    var request = createXMLHttpRequest();
    
    var param = toSource(param_obj);
    if ("POST" === method) {
        //http://so-zou.jp/web-app/tech/programming/javascript/ajax/post.htm
        request.open(method, url, true);
        request.responseType = responseType;
        //サーバに対して解析方法を指定する
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(param);
    } else {
        var get_url = url + "?" + param;
        request.open(method, get_url, true);
        request.responseType = responseType;
        console.log("set responseType:" + responseType);
        request.send("");
    }
    request.onreadystatechange = function () {
        var READYSTATE_COMPLETED = 4;
        var HTTP_STATUS_OK = 200;
        console.log("request.onreadystatechange called");
        if (request.readyState == READYSTATE_COMPLETED) {
            //受信し、ました
            console.log("request.readyState == READYSTATE_COMPLETED");
            if(request.status == HTTP_STATUS_OK){
                //受信完了時の処理
                console.log(request.responseText);
                callback(true, request.responseText);
            }else{
                callback(false);
            }
        }
        console.log("request.readyState != READYSTATE_COMPLETED");
    }
    console.log("request.onreadystatechange not called");
}


//送信ボタンにonclickイベントを追加
window.onload = function () {
    // document.getElementById("getbutton").onclick = send_get;
    // console.log("document.getElementById.onclic");

    post_or_get_string("http://codegarage.edisonthk.com/thisistest/json/get","GET",{a:"a",bb:"cccc"},"text",function(sucsess, text){
        console.log(text);
    });
}