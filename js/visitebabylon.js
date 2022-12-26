var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 100}, scene);

var panoramaMaterial = new BABYLON.Panorama360Material("panorama", scene);

panoramaMaterial.panoramaTexture = new BABYLON.Texture("path/to/panorama.jpg", scene);

sphere.material = panoramaMaterial;