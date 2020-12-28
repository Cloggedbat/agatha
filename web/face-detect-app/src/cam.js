async function getWebCam() {
    try {
        const videoSrc = await navigator.mediaDevices.getUserMedia({ video: true });
        var video = document.getElementById("video");
        video.srcObject = videoSrc;
    } catch (e) {
        console.log(e);
    }
}
getWebCam();
var capture = document.getElementById("capture");
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');



capture.addEventListener("click", function () {
    context.drawImage(video, 0, 0, 650, 490);
});
export default getWebCam;


