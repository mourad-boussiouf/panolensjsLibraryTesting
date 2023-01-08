//lightbox
function openModal() {
    document.getElementById("myModal").style.display = "block";
  }
  
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  
  var slideIndex = 1;
  showSlides(slideIndex);
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length){slideIndex = 1}
    else if (n < 1){slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
  }
  
  document.getElementById("lightboxthumb1").addEventListener( 'click', () => {
    openModal(); currentSlide(1);
  });
  document.getElementById("lightboxthumb2").addEventListener( 'click', () => {
    openModal(); currentSlide(2);
  });
  document.getElementById("lightboxthumb3").addEventListener( 'click', () => {
    openModal(); currentSlide(3);
  }); 
  document.getElementById("prevslide").addEventListener( 'click', () => {
    plusSlides(-1);
  });
  document.getElementById("nextslide").addEventListener( 'click', () => {
    plusSlides(1);
  });
  document.getElementById("lightbox1").addEventListener( 'click', () => {
    currentSlide(1);
  });
  document.getElementById("lightbox2").addEventListener( 'click', () => {
    currentSlide(2);
  });
  document.getElementById("lightbox3").addEventListener( 'click', () => {
    currentSlide(3);
  });
  document.getElementById("closelight").addEventListener( 'click', () => {
    closeModal();
  })
  
  //pano
  const viewer = new PANOLENS.Viewer({
     container: document.querySelector('#viewer'),
     controlBar: true,
     controlButtons:  ['fullscreen', 'setting', 'video'],
   });
  
  progressElement = document.getElementById('progress');
  centerPointElement = document.getElementById('reticule');
  
  //fonctions à appeler sur des addEventListener de panolens pour indiquer qu'un pano n'est pas chargé
  function addLoading (event) {
    progressElement.classList.remove('finish');
    progress = event.progress.loaded/ event.progress.total * 40;
    progressElement.style.width = progress + '%';
    if ( progress >= 40) {
      progressElement.classList.add('finish');
        setTimeout(()=> {progressElement.style.width = 0;},500);
    }
  }
  
  //generation pano et ajouts au viewer
  let objectLengthA = 10;
  let objectLengthB = 3;
   for (let i = 1; i < objectLengthA; i++) {
    window['pieceA'+i] = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite001/IMG_A'+i.toString()+'.jpg');
    eval('pieceA'+i).addEventListener('progress', addLoading);
    viewer.add(eval('pieceA'+i));
  }
  for (let i = 1; i < objectLengthB; i++) {
    window['pieceB'+i] = new PANOLENS.ImagePanorama('https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite001/IMG_B'+i.toString()+'.jpg');
    eval('pieceB'+i).addEventListener('progress', addLoading);
    viewer.add(eval('pieceB'+i));
  } 
  
  //deactivation camera control par keys
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
    forward: null,
    down: "pieceA8",
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
  
  var previousLookAt = new THREE.Vector3(0, 0, 0);
  let masterNode = pieceA1nodes;
  let currentNode = masterNode;
  updateMovingButtons();
  
  let azToDegCorrected = 0;
  let yawAxisQuarter = 1;
  //valeur encadrement pour les 4 poles
  let minBack=20;
  let minRight=140;
  let minUp=210;
  let minLeft=330;
  
  function updateMovingButtons() {
    //de dos
    if(yawAxisQuarter === 2){
      currentNode.down === null ? document.querySelector('#forwardButton').style.opacity="0.15" : document.querySelector('#forwardButton').style.opacity="1";
      currentNode.forward === null ? document.querySelector('#downButton').style.opacity="0.15" : document.querySelector('#downButton').style.opacity="1";
      currentNode.right === null ? document.querySelector('#leftButton').style.opacity="0.15": document.querySelector('#leftButton').style.opacity="1";
      currentNode.left === null ? document.querySelector('#rightButton').style.opacity="0.15": document.querySelector('#rightButton').style.opacity="1";
    //de droite
    }else if(yawAxisQuarter === 3){
      currentNode.right === null ? document.querySelector('#forwardButton').style.opacity="0.15" : document.querySelector('#forwardButton').style.opacity="1";
      currentNode.left === null ? document.querySelector('#downButton').style.opacity="0.15" : document.querySelector('#downButton').style.opacity="1";
      currentNode.forward === null ? document.querySelector('#leftButton').style.opacity="0.15": document.querySelector('#leftButton').style.opacity="1";
      currentNode.down === null ? document.querySelector('#rightButton').style.opacity="0.15": document.querySelector('#rightButton').style.opacity="1";
    //de face
    }else if(yawAxisQuarter === 1){
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
  
  document.querySelector('#forwardButton').addEventListener('click', () => {
    nodesCheck(yawAxisQuarter,"ArrowUp");
  });
  document.querySelector('#downButton').addEventListener('click', () => {
    nodesCheck(yawAxisQuarter,"ArrowDown"); 
  });
  document.querySelector('#leftButton').addEventListener('click', () => {
    nodesCheck(yawAxisQuarter,"ArrowLeft");
  } );
  document.querySelector('#rightButton').addEventListener('click', () => {
    nodesCheck(yawAxisQuarter,"ArrowRight");
  } ); 
  
  function nodesCheck(actualYawAxisQuarter, eventKey) {
    if(actualYawAxisQuarter === 1){
        eventKey = eventKey;
    }
    else if(actualYawAxisQuarter === 2){
      if(eventKey === "ArrowUp"){
        eventKey = "ArrowDown";
      }
      else if(eventKey === "ArrowDown"){
        eventKey = "ArrowUp";
      }
      else if (eventKey === "ArrowRight"){
        eventKey = "ArrowLeft";
      }
      else if (eventKey === "ArrowLeft"){
        eventKey = "ArrowRight";
      }
    }
    else if(actualYawAxisQuarter === 3){
      if(eventKey === "ArrowUp"){
        eventKey = "ArrowRight"
    
      }else if(eventKey === "ArrowDown"){
        eventKey = "ArrowLeft"
    
      }else if(eventKey === "ArrowRight"){
        eventKey = "ArrowDown"; //1 forward 
    
      }else if (eventKey === "ArrowLeft"){
        eventKey = "ArrowUp"; //4 a gauche 
      }
    }
    else if(actualYawAxisQuarter === 4){
      if(eventKey === "ArrowUp"){
        eventKey = "ArrowLeft"
    
      }else if(eventKey === "ArrowDown"){
        eventKey = "ArrowRight"
    
      }else if(eventKey === "ArrowRight"){
        eventKey = "ArrowUp"; //1 forward 
    
      }else if (eventKey === "ArrowLeft"){
        eventKey = "ArrowDown"; //4 a gauche 
      }
    }
  
    var timer = true;
  
    if(timer){
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
            let actualNodesIndicator = currentNode.right + "nodes";
            if(actualNodesIndicator == "pieceB1nodes"){
              pieceChangeLookAt(true);
            }
            viewer.setPanorama(eval(currentNode.right));
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
            if(actualNodesIndicator == "pieceA3nodes"){
              pieceChangeLookAt(false);
            }
            currentNode = eval(actualNodesIndicator);
            updateMovingButtons()
            } 
            break;
      }
      timer = false;
      setTimeout(()=> {timer = true;},500);
    }
  }
  
  document.addEventListener('keydown', function(event) {
    nodesCheck(yawAxisQuarter,event.key);
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
  
  let new_infospot1 = new PANOLENS.Infospot(1337, 'https://i.ibb.co/Pz8S9K1/lolololol.png');
  new_infospot1.position.set(1687, -309, -5000);
  new_infospot1.addEventListener('click', () => {
    openModal(); currentSlide(1);
  });
  pieceA5.add(new_infospot1);
  
  let new_infospot2 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
  new_infospot2.position.set(-4810, -4329, -5000); 
  new_infospot2.addEventListener('click', () => {
    window.open('https://www.monuments-nationaux.fr/');
  });
  pieceA7.add(new_infospot2);
  
  
  let new_infospot3 = new PANOLENS.Infospot(300, PANOLENS.DataImage.Info); 
  new_infospot3.position.set(-3974, 777, 5000);
  new_infospot3.addEventListener('click', () => { 
    openModal(); currentSlide(3);
  });
  pieceA9.add(new_infospot3);
  
  
  let new_infospot2b = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
  new_infospot2b.position.set(-1773, -4019, -5000); 
  new_infospot2b.addEventListener('click', () => {
    window.open('https://www.monuments-nationaux.fr/');
  });
  pieceA8.add(new_infospot2b);
  
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
  
  function pieceChangeLookAt(first){
    if(first){
      previousLookAt = new THREE.Vector3(getPosition().x, getPosition().y, getPosition().z);
      setLook(previousLookAt);
      if(yawAxisQuarter === 2){
        previousLookAt = initialLookAtBack;
      }else if(yawAxisQuarter === 3){
        previousLookAt = initialLookAtRight;
      }else if(yawAxisQuarter === 1){
        previousLookAt = initialLookAt;
      }else{
       previousLookAt = initialLookAtLeft;
      }
      console.log(previousLookAt);
      setLook(initialLookAt);
    }else{
      console.log(previousLookAt.x);
      setLook(previousLookAt);
    }
  }
  
  function setLook(vectorDirection) {
    viewer.tweenControlCenter(vectorDirection);
  }
  
  const initialLookAt = new THREE.Vector3(-5000, 200, -500);
  const initialLookAtBack = new THREE.Vector3(5000, 100, -500);
  const initialLookAtLeft = new THREE.Vector3(-2000, 150, 4999);
  const initialLookAtRight = new THREE.Vector3(430, 239, -5000);
  
  setTimeout(() => {
    setLook(initialLookAt);
  }, 50);
  
  function updateYawData() {
  let azimuth = viewer.getControl().getAzimuthalAngle();
  let azToDeg = THREE.Math.radToDeg(azimuth);
  azToDegCorrected = azToDeg +180;
    if(azToDegCorrected>= minUp && azToDegCorrected <minLeft){
      yawAxisQuarter = 1;
    //mode1 l'user regarde devant
    }else if(azToDegCorrected>=minBack  && azToDegCorrected <minRight){
      yawAxisQuarter = 2;
    //mode2 l'user regarde derriere
    }else if(azToDegCorrected>= minRight && azToDegCorrected <minUp){
      yawAxisQuarter = 3;
    //mode3 l'user regarde sur sa droite
    }else{
      yawAxisQuarter = 4;
      //mode4 l'user regarde sur sa gauche
    }
  updateMovingButtons()
  }
  
  setInterval(updateYawData, 180);
  
  /* element.addEventListener("click", () => {
     document.piece1.click()
  }); */
   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
     viewer.enableControl(PANOLENS.CONTROLS.DEVICEORIENTATION);
     document.getElementById('loadxyz').className = "1";
  