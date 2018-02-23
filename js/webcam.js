function take_snapshot() {
	    Webcam.snap(function(data_uri) {
	    document.getElementById('results').innerHTML = '<img id="base64image" src="'+data_uri+'"/>';
	});
}
function ShowCam(){
	Webcam.set({
	width: 320,
	height: 240,
	image_format: 'jpeg',
	jpeg_quality: 100
	});
	Webcam.attach('#my_camera');
}