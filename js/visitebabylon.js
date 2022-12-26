var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 100}, scene);

var panoramaMaterial = new BABYLON.Panorama360Material("panorama", scene);

panoramaMaterial.panoramaTexture = new BABYLON.Texture("path/to/panorama.jpg", scene);

sphere.material = panoramaMaterial;

var panoramaTextures = [
    "path/to/panorama1.jpg",
    "path/to/panorama2.jpg",
    "path/to/panorama3.jpg"
  ];
  
  var currentPanoramaIndex = 0;
  
  function changePanorama() {

    panoramaMaterial.panoramaTexture = new BABYLON.Texture(panoramaTextures[currentPanoramaIndex], scene);
  
    currentPanoramaIndex++;

    if (currentPanoramaIndex >= panoramaTextures.length) {
      currentPanoramaIndex = 0;
    }
  }
  
  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 38) { 
      changePanorama();
    }
  });