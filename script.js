const baseImageInput = document.getElementById("baseImageInput");
const mergeButton = document.getElementById("mergeButton");
const previewImage = document.getElementById("previewImage");
const thumbnailImage = document.getElementById("thumbnailImage");
const downloadButton = document.getElementById("downloadButton");
const overlayImage = new Image();
overlayImage.crossOrigin = "anonymous";
overlayImage.src = "image/onam.png";

baseImageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const baseImage = new Image();
  baseImage.src = URL.createObjectURL(file);

  baseImage.onload = function () {
    thumbnailImage.style.display = "none"; // Hide the thumbnail image
    mergeButton.style.display = "block"; // Show the merge button
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


    // const imageInput = document.getElementById('mergedImageURL');
    //   const previewImage = document.getElementById('previewImage');
    //   function previewSelectedImage() {
    //      const file = imageInput.files[0];
    //      if (file) {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = function(e) {
    //            previewImage.src = e.target.result;
    //         }
    //      }
    //   }
    //   imageInput.addEventListener('change', previewSelectedImage);


       previewImage.src = mergedImageURL; // Display the merged image
       previewImage.style.display = "block";
       mergeButton.style.display = "none";
    downloadButton.style.display = "block"; // Show the download button
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
