const xyz = "loaded";
const viewer = new PANOLENS.Viewer({
   container: document.querySelector('#viewer'),
 });

 let piece1 = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite001/IMG_20221111_121057_00_001.jpg');
 viewer.add(piece1);

 let piece2 = new PANOLENS.ImagePanorama('../images/visite001/IMG_20221111_120923_00_002.jpg');
 viewer.add(piece2);

 let piece3 = new PANOLENS.ImagePanorama('../images/visite001/IMG_20221111_120831_00_003.jpg') 
 viewer.add(piece3);

 let piece4 = new PANOLENS.ImagePanorama('../images/visite001/IMG_20221111_120758_00_004.jpg') 
 viewer.add(piece4);


 //add 2eme globe au viewer

 //entrees
 piece1.link(piece2, new THREE.Vector3(2847, -5000, 1398),);

 piece2.link(piece3, new THREE.Vector3(3440, -5000, -623),); 

 piece3.link(piece4, new THREE.Vector3(2723, -5000, -1737),);



 //sorties
 piece2.link(piece1, new THREE.Vector3(-3953, -4999, 144),); 

 piece3.link(piece2, new THREE.Vector3(-3380, -5000, -452),); 

 piece4.link(piece3, new THREE.Vector3(-3199, -5000, 500),); 

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
     case 'piece4':
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
