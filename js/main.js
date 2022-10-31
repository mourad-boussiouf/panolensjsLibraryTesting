
 const viewer = new PANOLENS.Viewer({
    container: document.querySelector('#viewer'),
  });

  let piece1 = new PANOLENS.ImagePanorama('../images/pano1.jpeg');

  //add 1er globe au viewer
  viewer.add(piece1);

  let piece2 = new PANOLENS.ImagePanorama('../images/pano2.jpeg');

  viewer.add(piece2);

  let piece3 = new PANOLENS.ImagePanorama('../images/pano3.jpeg')

  viewer.add(piece3);

  //infospot1 alert
  let new_infospot1 = new PANOLENS.Infospot(200, PANOLENS.DataImage.Info);
  new_infospot1.position.set(1500, -800, -2000);
  new_infospot1.addEventListener('click', () => {
    alert('Vous avez cliqué !')
  });
  piece3.add(new_infospot1);

  //infospot 2 message
  let new_infospot2 = new PANOLENS.Infospot(200, PANOLENS.DataImage.Info);
  new_infospot2.position.set(6500, 500, 0);
  new_infospot2.addHoverElement(document.querySelector('#endVisit'), 200);
  piece1.addEventListener('leave', () => {
    document.querySelectorAll('.infospot').forEach((infospot) => {
      infospot.style.display = 'none';
    });
  });
  piece3.add(new_infospot2);

  //add 2eme globe au viewer

  piece1.link(piece2, new THREE.Vector3(700, -279, -4000),); 
  piece2.link(piece3, new THREE.Vector3(-1400, -400, -3000),);
  piece2.link(piece1, new THREE.Vector3(4895, -194, -5000),);
  piece3.link(piece2, new THREE.Vector3(-500, -400, 1000),);

  window.addEventListener('click', (event) => {
    getPosition()
    console.log(getPosition());
  });

  function getPosition() { 
    const a = viewer.raycaster.intersectObject(viewer.panorama, true)[0].point;
    return a;
  };

document.querySelectorAll('.chaptersButtons').forEach(chapterButton =>
  chapterButton.addEventListener("click", () => {
    switch (chapterButton.attributes[1].value) {
      case 'piece1':
        viewer.setPanorama(piece1);
        break;
      case 'piece2':
        viewer.setPanorama(piece2);
        break;
      case 'piece3':
        viewer.setPanorama(piece3);
        break;
    }
  })
);

/* element.addEventListener("click", () => {
    document.piece1.click()
}); */
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    viewer.enableControl(PANOLENS.CONTROLS.DEVICEORIENTATION);
