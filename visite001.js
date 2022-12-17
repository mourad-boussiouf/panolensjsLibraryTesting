//15 dec a 10h


const viewer = new PANOLENS.Viewer({
    container: document.querySelector('#viewer'),
    controlBar: true,
    controlButtons:  ['fullscreen', 'setting', 'video'],
  });
 
 progressElement = document.getElementById('progress');
 centerPointElement = document.getElementById('reticule');
 
 //fonctions à appeler sur des addEventListener de panolens pour indiquer qu'un pano n'est pas chargé mais qui ont posé des soucis
 function removeLoading (event) {
   progressElement.style.width = 0;
   progressElement.classList.remove('finish');
 }
 
 function addLoading (event) {
   progress = event.progress.loaded / event.progress.total;
   progressElement.style.width = progress + '%';
   if ( progress === 1 ) {
     progressElement.classList.add('finish');
   }
 }
 
 let objectLengthA = 10;
 let objectLengthB = 2;
 
 /* for (let i = 1; i < objectLengthA; i++) {
   console.log("COMPTEUR1",i);
   window['pieceA'+i] = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite001/IMG_A'+i+'.jpg');
   viewer.add(eval('pieceA'+i));
 }
 for (let i = 1; i < objectLengthB; i++) {
   console.log("COMPTEUR2",i);
   window['pieceB'+i] = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite001/IMG_B'+i+'.jpg');
   viewer.add(eval('pieceB'+i));
 } */
  let pieceA1 = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite002/IMG_001.jpg');
  viewer.add(pieceA1);
 
  let pieceA2 = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite002/IMG_002.jpg');
  viewer.add(pieceA2);
 
  let pieceA3 = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite002/IMG_003.jpg');
  viewer.add(pieceA3);
 
  let pieceA4 = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite002/IMG_006.jpg'); 
  viewer.add(pieceA4);
 
  let pieceA5 = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite002/IMG_007.jpg'); 
  viewer.add(pieceA5);
 
  let pieceA6 = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite002/IMG_008.jpg');
  viewer.add(pieceA6);
 
  let pieceA7 = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite002/IMG_009.jpg');
  viewer.add(pieceA7);
 
  let pieceA8 = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite002/IMG_010.jpg'); 
  viewer.add(pieceA8);
 
  let pieceA9 = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite002/IMG_012.jpg'); 
  viewer.add(pieceA9);
 
  let pieceA10 = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite002/IMG_013.jpg'); 
  viewer.add(pieceA10);
 
  let pieceB1 = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite002/IMG_004.jpg');
  viewer.add(pieceB1);
 
  let pieceB2 = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite002/IMG_005.jpg'); 
  viewer.add(pieceB2);
  
 
 viewer.getControl = function () {
   this.control.noKeys = true;
   return this.control;
 }
 
 viewer.getControl();
 
  //arbre possibilités de déplacement chaque pano
 let pieceA1nodes = {
   forward: "pieceA2",
   down: null,
   left: null,
   right: null
 }
 
 let pieceA2nodes= {
   forward: "pieceA3",
   down: "pieceA1",
   left: null,
   right: null
 }
 
 let pieceA3nodes= {
   forward: "pieceA4",
   down: "pieceA2",
   left: null,
   right: "pieceB1"
 }
 
 let pieceA4nodes= {
   forward: "pieceA5",
   down: "pieceA3",
   left: null,
   right: "pieceB1"
 }
 
 let pieceA5nodes= {
   forward: "pieceA6",
   down: "pieceA4",
   left: null,
   right: null
 }
 
 let pieceA6nodes= {
   forward: "pieceA7",
   down: "pieceA5",
   left: null,
   right: null
 }
 
 let pieceA7nodes= {
   forward: "pieceA8",
   down: "pieceA6",
   left: null,
   right: null
 }
 
 let pieceA8nodes= {
   forward: "pieceA9",
   down: "pieceA7",
   left: null,
   right: null
 }
 
 let pieceA9nodes= {
   forward: "pieceA10",
   down: "pieceA8",
   left: null,
   right: null
 }
 
 let pieceA10nodes= {
   forward: null,
   down: "pieceA9",
   left: null,
   right: null
 }
 
 let pieceB1nodes= {
   forward: "pieceB2",
   down: "pieceA3",
   left: null,
   right: null
 }
 
 let pieceB2nodes= {
   forward: null,
   down: "pieceB1",
   left: null,
   right: null
 }
 
 let masterNode = pieceA1nodes;
 let currentNode = masterNode;
 updateMovingButtons();
 
 let azToDegCorrected = 0;
 
 function updateMovingButtons() {
   //de dos
   if(azToDegCorrected>=0  && azToDegCorrected <120){
     currentNode.down === null ? document.querySelector('#forwardButton').style.opacity="0.15" : document.querySelector('#forwardButton').style.opacity="1";
     currentNode.forward === null ? document.querySelector('#downButton').style.opacity="0.15" : document.querySelector('#downButton').style.opacity="1";
     currentNode.right === null ? document.querySelector('#leftButton').style.opacity="0.15": document.querySelector('#leftButton').style.opacity="1";
     currentNode.left === null ? document.querySelector('#rightButton').style.opacity="0.15": document.querySelector('#rightButton').style.opacity="1";
   //de droite
   }else if(azToDegCorrected>= 120 && azToDegCorrected <180){
     currentNode.right === null ? document.querySelector('#forwardButton').style.opacity="0.15" : document.querySelector('#forwardButton').style.opacity="1";
     currentNode.left === null ? document.querySelector('#downButton').style.opacity="0.15" : document.querySelector('#downButton').style.opacity="1";
     currentNode.forward === null ? document.querySelector('#leftButton').style.opacity="0.15": document.querySelector('#leftButton').style.opacity="1";
     currentNode.down === null ? document.querySelector('#rightButton').style.opacity="0.15": document.querySelector('#rightButton').style.opacity="1";
   //de face
   }else if(azToDegCorrected>= 180 && azToDegCorrected <300){
     currentNode.forward === null ? document.querySelector('#forwardButton').style.opacity="0.15" : document.querySelector('#forwardButton').style.opacity="1";
     currentNode.down === null ? document.querySelector('#downButton').style.opacity="0.15" : document.querySelector('#downButton').style.opacity="1";
     currentNode.left === null ? document.querySelector('#leftButton').style.opacity="0.15": document.querySelector('#leftButton').style.opacity="1";
     currentNode.right === null ? document.querySelector('#rightButton').style.opacity="0.15": document.querySelector('#rightButton').style.opacity="1";
   //de gauche
   }else{
     currentNode.left === null ? document.querySelector('#forwardButton').style.opacity="0.15" : document.querySelector('#forwardButton').style.opacity="1";
     currentNode.right === null ? document.querySelector('#downButton').style.opacity="0.15" : document.querySelector('#downButton').style.opacity="1";
     currentNode.down === null ? document.querySelector('#leftButton').style.opacity="0.15": document.querySelector('#leftButton').style.opacity="1";
     currentNode.forward === null ? document.querySelector('#rightButton').style.opacity="0.15": document.querySelector('#rightButton').style.opacity="1";
   }
 }
 
 document.querySelector('#forwardButton').addEventListener( 'click', () => {
   if(azToDegCorrected>=0  && azToDegCorrected <90){
     nodesCheck("ArrowDown");
   }else if(azToDegCorrected>= 90 && azToDegCorrected <180){
     nodesCheck("ArrowRight");
   }else if(azToDegCorrected>= 180 && azToDegCorrected <270){
     nodesCheck("ArrowUp");
   }else{
     nodesCheck("ArrowLeft");
   }
 } );
 document.querySelector('#downButton').addEventListener( 'click', () => {
   if(azToDegCorrected>=0  && azToDegCorrected <90){
     nodesCheck("ArrowUp");
   }else if(azToDegCorrected>= 90 && azToDegCorrected <180){
     nodesCheck("ArrowLeft");
   }else if(azToDegCorrected>= 180 && azToDegCorrected <270){
     nodesCheck("ArrowDown");
   }else{
     nodesCheck("ArrowRight");
   }
 } );
 document.querySelector('#leftButton').addEventListener( 'click', () => {
   if(azToDegCorrected>=0  && azToDegCorrected <90){
     nodesCheck("ArrowRight");
   }else if(azToDegCorrected>= 90 && azToDegCorrected <180){
     nodesCheck("ArrowUp");
   }else if(azToDegCorrected>= 180 && azToDegCorrected <270){
     nodesCheck("ArrowLeft");
   }else{
     nodesCheck("ArrowDown");
   }
 } );
 document.querySelector('#rightButton').addEventListener( 'click', () => {
   if(azToDegCorrected>=0  && azToDegCorrected <90){
     nodesCheck("ArrowLeft");
   }else if(azToDegCorrected>= 90 && azToDegCorrected <180){
     nodesCheck("ArrowDown");
   }else if(azToDegCorrected>= 180 && azToDegCorrected <270){
     nodesCheck("ArrowRight");
   }else{
     nodesCheck("ArrowUp");
   }
 } );
 
 function nodesCheck(eventKey) {
   switch (eventKey) {
     case "ArrowLeft":
       if(currentNode.left != null){
         viewer.setPanorama(eval(currentNode.left));
         let actualNodesIndicator = currentNode.left + "nodes";
         currentNode = eval(actualNodesIndicator);
         updateMovingButtons()
         } 
         break;
     case "ArrowRight":
       if(currentNode.right != null){
         viewer.setPanorama(eval(currentNode.right));
         let actualNodesIndicator = currentNode.right + "nodes";
         currentNode = eval(actualNodesIndicator);
         updateMovingButtons()
         } 
         break;
     case "ArrowUp":
         if(currentNode.forward != null){
         viewer.setPanorama(eval(currentNode.forward));
         let actualNodesIndicator = currentNode.forward + "nodes";
         currentNode = eval(actualNodesIndicator);
         updateMovingButtons()
         } 
         break;
     case "ArrowDown":
       if(currentNode.down != null){
         viewer.setPanorama(eval(currentNode.down));
         let actualNodesIndicator = currentNode.down + "nodes";
         currentNode = eval(actualNodesIndicator);
         updateMovingButtons()
         } 
         break;
   }
 }
 
 document.addEventListener('keydown', function(event) {
   let key = "";
   if(azToDegCorrected> 150 && azToDegCorrected <330){
     key = event.key;
   }
   else {
     switch (event.key) {
       case "ArrowLeft":
         key="ArrowRight"
           break;
       case "ArrowRight":
         key="ArrowLeft"
           break;
       case "ArrowUp":
         key="ArrowDown"
           break;
       case "ArrowDown":
         key="ArrowUp"
           break;
     }
   }
 
   nodesCheck(key);
 
 });
   
 document.querySelector('.arrowGlobeUp').addEventListener( 'click', () => {
   setLook(initialLookAt);
 } );
 document.querySelector('.arrowGlobeDown').addEventListener( 'click', () => {
   setLook(initialLookAtBack);
 } );
 document.querySelector('.arrowGlobeLeft').addEventListener( 'click', () => {
   setLook(initialLookAtLeft);
 } );
 document.querySelector('.arrowGlobeRight').addEventListener( 'click', () => {
   setLook(initialLookAtRight);
 } );
 
 infospot = new PANOLENS.Infospot( 1500, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Mona_Lisa.jpg/792px-Mona_Lisa.jpg');
 infospot.position.set( -100, -500, -5000 );
 pieceA1.add( infospot );
 //link=points cliquables, commenté si navigation full stick
 /*  //entrees piece A
  pieceA1.link(pieceA2, new THREE.Vector3(-1600, -1200, -600),);
  pieceA2.link(pieceA3, new THREE.Vector3(-1400, -1600, -590),);
  pieceA3.link(pieceA4, new THREE.Vector3(-1400, -1600, -200),);
 
 //passerelle piece B
  pieceA3.link(pieceB1, new THREE.Vector3(-3000, -3350, -5000),);
  pieceA4.link(pieceB2, new THREE.Vector3(5000, -1218, -4203),);
 
 //entrees piece B
 pieceB1.link(pieceB2, new THREE.Vector3(-1400, -1600, -590),);
 
 //sorties piece A
  pieceA2.link(pieceA1, new THREE.Vector3(5000, -4794, 386),);
  pieceA3.link(pieceA2, new THREE.Vector3(5000, -1005, 370),);
  pieceA4.link(pieceA3, new THREE.Vector3(5000, -700, 1650),);
 
 // retour vers piece A
  pieceB1.link(pieceA3, new THREE.Vector3(5000, -1005, 370),);
 
  //sortie piece B
  pieceB2.link(pieceB1, new THREE.Vector3(5000, -1005, 370),); */
 
  //console position
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
 
  function getPositionUv() { 
   if(viewer.raycaster.intersectObject(viewer.panorama, true)[0].uv){
   const a = viewer.raycaster.intersectObject(viewer.panorama, true)[0].uv;
   return a;
   }else{return "erreur"}
 };
 
 function logCamera() { 
   console.log(viewer.getCamera().rotation)
 };
 
 //changements panos par "barre de chapitres"
 document.querySelectorAll('.whiteCircle').forEach(chapterButton =>
  chapterButton.addEventListener("click", () => {
    switch (chapterButton.innerText) {
      case 'piece1':
        viewer.setPanorama(pieceA1);
        currentNode = pieceA1nodes;
        updateMovingButtons()
        break;
      case 'piece2':
        viewer.setPanorama(pieceB1);
        currentNode = pieceB1nodes;
        updateMovingButtons()
        break;
    }
  })
 );
 
 function setLook(direction) {
   viewer.tweenControlCenter(direction);
 }
 
 const initialLookAt = new THREE.Vector3(-5000, 200, -500);
 const initialLookAtBack = new THREE.Vector3(5000, 100, -500); 
 const initialLookAtLeft = new THREE.Vector3(-2000, 150, 4999);
 const initialLookAtRight = new THREE.Vector3(430, 239, -5000);
 
 setTimeout(() => {
   setLook(initialLookAt);
 }, 50);
 
 let az = Math.atan2(5000, 100) * 180 / Math.PI;
 
 function consolelogdashboard() {
 let azimuth = viewer.getControl().getAzimuthalAngle();
 let azToDeg = THREE.Math.radToDeg(azimuth);
 azToDegCorrected = azToDeg +180;
 console.log("log1",azToDegCorrected);
 console.log("log3");
 updateMovingButtons()
 }
 
 setInterval(consolelogdashboard, 150);
 
 /* element.addEventListener("click", () => {
    document.piece1.click()
 }); */
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    viewer.enableControl(PANOLENS.CONTROLS.DEVICEORIENTATION);
    document.getElementById('loadxyz').className = "1";