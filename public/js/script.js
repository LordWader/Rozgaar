if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream){
    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
  
var video = document.getElementById('video');
QCodeDecoder().decodeFromCamera(video, function(er,res){
  console.log(res);
});
