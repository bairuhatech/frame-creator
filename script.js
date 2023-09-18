const baseImageInput = document.getElementById("baseImageInput");
const mergeButton = document.getElementById("mergeButton");
const previewImage = document.getElementById("previewImage");
const thumbnailImage = document.getElementById("thumbnailImage");
const downloadButton = document.getElementById("downloadButton");
const overlayImage = new Image();
overlayImage.crossOrigin = "anonymous";
overlayImage.src = "image/madina.png";

const transparentCoordinates = {
  x1: 925,
  y1: 1380,
  x2: 1425,
  y2: 2069,
};

baseImageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const uploadedImage = new Image();
  uploadedImage.src = URL.createObjectURL(file);

  uploadedImage.onload = function () {
    thumbnailImage.style.display = "none";
    mergeButton.style.display = "block";
  };
});

mergeButton.addEventListener("click", function () {
  const uploadedImage = document.createElement("img");
  uploadedImage.src = URL.createObjectURL(baseImageInput.files[0]);

  uploadedImage.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = overlayImage.width;
    canvas.height = overlayImage.height;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      uploadedImage,
      transparentCoordinates.x1,
      transparentCoordinates.y1,
      transparentCoordinates.x2 - transparentCoordinates.x1,
      transparentCoordinates.y2 - transparentCoordinates.y1
    );

    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(overlayImage, 0, 0, overlayImage.width, overlayImage.height);

    const mergedImageURL = canvas.toDataURL("image/jpeg");
    previewImage.src = mergedImageURL;
    previewImage.style.display = "block";
    mergeButton.style.display = "none";
    downloadButton.style.display = "block";
  };
});

downloadButton.addEventListener("click", function () {
  const a = document.createElement("a");
  a.href = previewImage.src;
  a.download = "merged_image.jpg";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
