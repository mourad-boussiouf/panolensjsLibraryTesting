
    const viewer = new PANOLENS.Viewer({
    container: document.querySelector('#viewer'),
  });

  let panorama = new PANOLENS.ImagePanorama('../images/pano2.jpeg');

  //add 1er globe au viewer
  viewer.add(panorama);

  let new_panorama = new PANOLENS.ImagePanorama('../images/pano3.jpeg');

  //infospot1 alert
  let new_infospot1 = new PANOLENS.Infospot(200, PANOLENS.DataImage.Info);
  new_infospot1.position.set(1500, -800, -2000);
  new_infospot1.addEventListener('click', function () {
    alert('Vous avez cliqué !')
  });
  new_panorama.add(new_infospot1);

  //infospot 2 message
  let new_infospot2 = new PANOLENS.Infospot(200, PANOLENS.DataImage.Info);
  new_infospot2.position.set(6500, 500, 0);
  new_infospot2.addHoverElement(document.querySelector('#endVisit'), 200);
  new_panorama.addEventListener('leave', function () {
    document.querySelectorAll('.infospot').forEach(function (infospot) {
      infospot.style.display = 'none';
    });
  });
  new_panorama.add(new_infospot2);

  //add 2eme globe au viewer
  viewer.add(new_panorama);

  panorama.link(new_panorama, new THREE.Vector3(-1400, -400, -3000),);
  new_panorama.link(panorama, new THREE.Vector3(-500, -400, 1000),);
  
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    viewer.enableControl(PANOLENS.CONTROLS.DEVICEORIENTATION);
