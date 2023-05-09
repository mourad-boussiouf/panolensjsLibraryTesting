var hover1 = false;
var hover2 = false;
var hover3 = false;
var hover4 = false;
var hover5 = false;
var slideIndex = 1;
var dataPano = [];
var currentThumnail = null;
var sphericalHeadingIndicatorValue = 0;
var showSphericalHeadingIndicator = false;

var panolandIsRunning = false;

  loadAll();
  let piece1 = {
    title: "piece1",
    imgUrl:
      "https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite001/IMG_A1.jpg",
  };
  let piece2 = {
    title: "piece2",
    imgUrl:
      "https://cdn.jsdelivr.net/gh/mourad-boussiouf/panolensjsLibraryTesting/images/visite001/IMG_B1.jpg",
  };
  dataPano.push(piece1, piece2);
  


 async function loadAll() {
  await threeload();
  await panoload();
  await loadScript();
  var panolandIsRunning = true;
}

async function callStackHandler() {
  return await new Promise((res) => setTimeout(res, 0));
}
async function b(c) {
  await callStackHandler();
  if (document.getElementById(c).className !== "1") {
    await b(c);
  } else if (document.getElementById(c).className === "1") {
    return new Promise((resolve) => {
      resolve("ok");
    });
  }
}

 function showthumbnails(index) {
  currentThumnail = index;
 }


async function threeload() {
  let threeLoader = document.createElement("script");
  threeLoader.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/gh/mourad-boussiouf/prototypemodulevisit3D/js/three.min.js"
  );
  document.head.appendChild(threeLoader);
  await b("loadefg");
  return new Promise((resolve) => {
    resolve("ok");
  });
}

async function panoload() {
  let panolensLoader = document.createElement("script");
  panolensLoader.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/gh/mourad-boussiouf/prototypemodulevisit3D/js/panolens.min.js"
  );
  document.head.appendChild(panolensLoader);
  await b("loadklm");
  return new Promise((resolve) => {
    resolve("ok");
  });
}

async function loadScript() {
    console.log("toto3")
let VisitLoader = document.createElement("script");
VisitLoader.setAttribute(
  "src",
  "./Visite1POC.js"
);
document.head.appendChild(VisitLoader);
  await b("loadxyz");
  return new Promise((resolve) => {
    resolve("ok");
  });
}
