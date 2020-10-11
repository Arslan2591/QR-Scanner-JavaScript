//const qrcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
const link_to_data = document.getElementById("link_to_data");

let scanning = false;

qrcode.callback = res => {
  if (res) {
    outputData.innerText = res;
    link_to_data.href = res;
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  }
};

btnScanQR.onclick = () => {




  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: "environment",
        height: 480,
        width: 480,
      }
    })
    .then(function (stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();

      //draw over on the video canvas
      var x = document.getElementById("overlay");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "block";
      }

      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode()

    //hide overlay
    var x = document.getElementById("overlay");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "none";
    }

  } catch (e) {
    setTimeout(scan, 300);
  }
}
