qrcode.callback = function (data) {
  window.parent.postMessage(data, "*");
};

var video = document.querySelector("#videoElement");

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

if (navigator.getUserMedia) {
   navigator.getUserMedia({video: true}, handleVideo, videoError);
}

function handleVideo(stream) {
   video.src = window.URL.createObjectURL(stream);
}

function videoError(e) {
   // do something
}

var captureToCanvas= document.querySelector('#capture');

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var capture = document.querySelector("#capture");
  capture.addEventListener("click", function (e) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    data_url = canvas.toDataURL('image/png');
    //console.log(data_url);
    console.log(qrcode.decode(data_url));
}, false);
