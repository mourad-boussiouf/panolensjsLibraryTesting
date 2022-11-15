const xyz = "loaded";
const viewer = new PANOLENS.Viewer({
   container: document.querySelector('#viewer'),
 });

 let piece1 = new PANOLENS.ImagePanorama('../images/visite001/IMG_20221111_121057_00_001.jpg');
 viewer.add(piece1);

 let piece2 = new PANOLENS.ImagePanorama('../images/visite001/IMG_20221111_121057_00_002.jpg');
 viewer.add(piece2);

 let piece3 = new PANOLENS.ImagePanorama('../images/visite001/IMG_20221111_121057_00_003.jpg')
 viewer.add(piece3);

 let piece4 = new PANOLENS.ImagePanorama('../images/visite001/IMG_20221111_121057_00_004.jpg')
 viewer.add(piece4);

 //add 2eme globe au viewer

 piece1.link(piece3, new THREE.Vector3(4999, -4288, 2842),);

 piece2.link(piece3, new THREE.Vector3(-1400, -400, -3000),);

 piece2.link(piece1, new THREE.Vector3(4895, -194, -5000),);

 piece3.link(piece2, new THREE.Vector3(-500, -400, 1000),);

 window.addEventListener('click', (event) => {
   getPosition()
   console.log(getPosition());
 });

 function getPosition() { 
   if(viewer.raycaster.intersectObject(viewer.panorama, true)[0].point){
   const a = viewer.raycaster.intersectObject(viewer.panorama, true)[0].point;
   return a;
   }else{return "erreur"}
 };

document.querySelectorAll('.chaptersButtons').forEach(chapterButton =>
 chapterButton.addEventListener("click", () => {
  console.log(chapterButton.attributes[1].value);
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
