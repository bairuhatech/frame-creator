const baseImageInput = document.getElementById("baseImageInput");
const mergeButton = document.getElementById("mergeButton");
const overlayImage = new Image();
overlayImage.crossOrigin = "anonymous";
overlayImage.src = "image/onam.png"; 

baseImageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const baseImage = new Image();
  baseImage.src = URL.createObjectURL(file);

  baseImage.onload = function () {
    mergeButton.style.display = "block"; 
  };
});

mergeButton.addEventListener("click", function () {
  const baseImage = document.createElement("img");
  baseImage.src = URL.createObjectURL(baseImageInput.files[0]);

  baseImage.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(baseImage, 0, 0);
    ctx.globalAlpha = 1; 
    ctx.drawImage(overlayImage, 0, 0, baseImage.width, baseImage.height);

    const mergedImageURL = canvas.toDataURL("image/jpeg");
    const a = document.createElement("a");
    a.href = mergedImageURL;
    a.download = "merged_image.jpg";
    a.click();
  };
});