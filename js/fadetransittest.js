var panorama1 = new BABYLON.PanoramaTexture("panorama1", "path/to/panorama1.jpg", scene);
panorama1.alphaBlending = true;

var panorama2 = new BABYLON.PanoramaTexture("panorama2", "path/to/panorama2.jpg", scene);
panorama2.alphaBlending = true;

function transition(fromPanorama, toPanorama, duration) {
  var fovAnimation = new BABYLON.Animation("fovAnimation", "fov", 30, 120, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
  
  var alphaAnimation = new BABYLON.Animation("alphaAnimation", "alpha", 1, 0, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
  
  var fovKeys = [{ frame: 0, value: camera.fov }, { frame: duration, value: toPanorama.fov }];
  fovAnimation.setKeys(fovKeys);
  var alphaKeys =