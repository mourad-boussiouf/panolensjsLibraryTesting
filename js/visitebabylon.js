var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 100}, scene);

var panoramaMaterial = new BABYLON.Panorama360Material("panorama", scene);

panoramaMaterial.panoramaTexture = new BABYLON.Texture("path/to/panorama.jpg", scene);

sphere.material = panoramaMaterial;

var horloge {4
  {1 => }
}

actualOrientation = BabylonYawBidule();
actualPano = panoramasTexturesNodes.a[1];
NextPano = determinateNextPano(actualOrientation, actualPano)

var panoramasTexturesNodes = {
a: { 
    1: "path/to/panorama1.jpg", 2: "path/to/panorama2.jpg", 3: "path/to/panorama3.jpg",
    4: "path/to/panorama4.jpg", 5: "path/to/panorama5.jpg", 6: "path/to/panorama6.jpg",
    7: "path/to/panorama7.jpg", 8: "path/to/panorama8.jpg", 9: "path/to/panorama9.jpg",
    10: "path/to/panorama10.jpg", 11: "path/to/panorama11.jpg", 12: "path/to/panorama12.jpg",
    },
b: { 
    1: "path/to/panorama1.jpg", 2: "path/to/panorama2.jpg", 3: "path/to/panorama3.jpg",
    4: "path/to/panorama4.jpg", 5: "path/to/panorama5.jpg", 6: "path/to/panorama6.jpg",
    7: "path/to/panorama7.jpg", 8: "path/to/panorama8.jpg", 9: "path/to/panorama9.jpg",
    10: "path/to/panorama10.jpg", 11: "path/to/panorama11.jpg", 12: "path/to/panorama12.jpg",
    },
c: { 
    1: "path/to/panorama1.jpg", 2: "path/to/panorama2.jpg", 3: "path/to/panorama3.jpg",
    4: "path/to/panorama4.jpg", 5: "path/to/panorama5.jpg", 6: "path/to/panorama6.jpg",
    7: "path/to/panorama7.jpg", 8: "path/to/panorama8.jpg", 9: "path/to/panorama9.jpg",
    10: "path/to/panorama10.jpg", 11: "path/to/panorama11.jpg", 12: "path/to/panorama12.jpg",
  },
};
  
  var currentPanoramaIndex = 0;
  
  function determinateNextPano() {

    panoramaMaterial.panoramaTexture = new BABYLON.Texture(panoramaTextures[currentPanoramaIndex], scene);
  
    currentPanoramaIndex++;

    if (currentPanoramaIndex >= panoramaTextures.length) {
      currentPanoramaIndex = 0;
    }
  }
  
  window.addEventListener("keydown", function(event) {
    if (event.key === "arrowUp") { 
      determinateNextPano();
    }
  });