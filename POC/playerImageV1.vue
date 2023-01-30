<template>
  <div>
    <div id="loadefg" class="0"></div>
    <div id="loadklm" class="0"></div>
    <div id="loadxyz" class="0"></div>

    <div id="viewer" :class="{ relative: panolandIsRunning }">
      <div class="backgroundSphere">
        <div class="arrowGlobeUp"></div>
        <div class="arrowGlobeRight"></div>
        <div class="arrowGlobeLeft"></div>
        <div class="arrowGlobeDown"></div>
        <!-- <span id = "avantGlobeText" style="background-color: white;">{{$root.$t("common.rooms.liveRoom.btnArrowTop")}}</span> -->
      </div>
      <span id="reticule"></span>
      <div id="progress">
        <div id="bar"></div>
      </div>

      <button class="movebuttons" id="forwardButton">↑</button>
      <button class="movebuttons" id="leftButton">←</button>
      <button class="movebuttons" id="rightButton">→</button>
      <button class="movebuttons" id="downButton">↓</button>

      <div id="myModal" class="modal">
        <span class="close cursor" id="closelight">&times;</span>

        <div class="modal-content">
          <div class="mySlides">
            <div class="numbertext">1 / 3</div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fc/%C3%89douard_Manet_-_Le_D%C3%A9jeuner_sur_l%27herbe.jpg"
              style="width: 100%"
            />
          </div>

          <div class="mySlides">
            <div class="numbertext">2 / 3</div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Rimbaud_manuscrit_Voyelles.jpg/1200px-Rimbaud_manuscrit_Voyelles.jpg"
              style="width: 100%"
            />
          </div>

          <div class="mySlides">
            <div class="numbertext">3 / 3</div>
            <img
              src="https://img.bleacherreport.net/img/images/photos/002/196/757/65372110_crop_exact.jpg?w=3072&h=2048&q=75"
              style="width: 100%"
            />
          </div>

          <a class="prev" id="prevslide">&#10094;</a>
          <a class="next" id="nextslide">&#10095;</a>

          <div class="caption-container">
            <p id="caption"></p>
          </div>

          <div class="column">
            <img
              class="demo cursor"
              id="lightbox1"
              src="https://upload.wikimedia.org/wikipedia/commons/f/fc/%C3%89douard_Manet_-_Le_D%C3%A9jeuner_sur_l%27herbe.jpg"
              style="width: 100%"
              alt="Dejeuner sur l'herbe de Monet"
            />
          </div>
          <div class="column">
            <img
              class="demo cursor"
              id="lightbox2"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Rimbaud_manuscrit_Voyelles.jpg/1200px-Rimbaud_manuscrit_Voyelles.jpg"
              style="width: 100%"
              alt="Manuscrit de Rimbaud"
            />
          </div>
          <div class="column">
            <img
              class="demo cursor"
              id="lightbox3"
              src="https://img.bleacherreport.net/img/images/photos/002/196/757/65372110_crop_exact.jpg?w=3072&h=2048&q=75"
              style="width: 100%"
              alt="L'histoire du basket"
            />
          </div>
        </div>
      </div>
      <div id="progress"></div>
      <div class="toolsPano">
        <li v-for="(element, index) in dataPano" :key="index" class="panoData">
          <div
            class="chaptersButtons"
            style="position: absolute"
            :style="{
              left: (100 / dataPano.length) * index + '%',
              'margin-left': 100 / dataPano.length / 2 + '%',
            }"
            value="{element.title}"
          >
            <div
              class="whiteCircle"
              style="width: 7.5px; z-index: 99; height: 7.5px; cursor: pointer"
              @mouseenter="showthumbnails(index)"
              @mouseleave="currentThumnail = null"
            >
              {{ element.title }}
            </div>
            <div
              class="titlePano"
              :style="{ opacity: currentThumnail === index ? 1 : 0 }"
            >
              {{ element.title }}
            </div>
            <img
              class="thumbnailPano"
              :style="{ opacity: currentThumnail === index ? 1 : 0 }"
              :src="element.imgUrl"
            />
          </div>
          <!-- <div>{{element.title}}</div>
           <img :src="element.imgUrl"/> -->
        </li>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ModelShape } from "babylonjs/Particles/index";
import { resolve } from "dns";
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
  name: "PlayerImage",
})
export default class PlayerImageComponent extends Vue {
  public hover1: boolean = false;
  public hover2: boolean = false;
  public hover3: boolean = false;
  public hover4: boolean = false;
  public hover5: boolean = false;
  public slideIndex: number = 1;
  public dataPano: any = [];
  public currentThumnail: number = null;
  sphericalHeadingIndicatorValue: number = 0;
  showSphericalHeadingIndicator = false;

  public panolandIsRunning: boolean = false;

  async mounted() {
    this.loadAll();
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
    this.dataPano.push(piece1, piece2);
    console.log(this.dataPano);
  }

  public async loadAll() {
    await this.threeload();
    await this.panoload();
    await this.loadScript();
    this.panolandIsRunning = true;
  }

  public async callStackHandler() {
    return await new Promise((res) => setTimeout(res, 0));
  }
  public async b(c) {
    await this.callStackHandler();
    if (document.getElementById(c).className !== "1") {
      await this.b(c);
    } else if (document.getElementById(c).className === "1") {
      return new Promise((resolve) => {
        resolve("ok");
      });
    }
  }

  public showthumbnails(index) {
    this.currentThumnail = index;
  }

  public async threeload() {
    let threeLoader = document.createElement("script");
    threeLoader.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/gh/mourad-boussiouf/prototypemodulevisit3D/js/three.min.js"
    );
    document.head.appendChild(threeLoader);
    await this.b("loadefg");
    return new Promise((resolve) => {
      resolve("ok");
    });
  }

  public async panoload() {
    let panolensLoader = document.createElement("script");
    panolensLoader.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/gh/mourad-boussiouf/prototypemodulevisit3D/js/panolens.min.js"
    );
    document.head.appendChild(panolensLoader);
    await this.b("loadklm");
    return new Promise((resolve) => {
      resolve("ok");
    });
  }

  public async loadScript() {
    require("../assets/files/visite001.js");
    await this.b("loadxyz");
    return new Promise((resolve) => {
      resolve("ok");
    });
  }
}
</script>
<style lang="scss">
#viewer {
  position: absolute;
  background-color: rgba(46, 46, 46, 0.714);
  height: 51%;
  width: 85%;
  top: 10%;
  left: 7.5%;
  canvas {
    width: 100% !important;
    height: auto !important;
  }
}

.relative {
  position: relative !important;
}

#endVisit {
  width: 400px;
  height: 20%;
  background: rgba(255, 255, 255, 0.813);
  color: rgb(0, 0, 0);
  border-radius: 3px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 5px;
}

.thumbnailsBar {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center !important;
  align-items: center;
  position: absolute;
  z-index: 999;
  margin-right: 76px;
  margin-top: 417px;
  width: 66%;
  height: 10px;
  border-radius: 10px;
  background-color: #09fe0100;
}

.hoverThumbnail {
  width: 88px;
  height: 45px;
  background-color: white;
  margin-bottom: 100px;
  border-radius: 2.5px;
  opacity: 0;
  opacity: 1;
  z-index: 1000;
}

.hoverThumbnailImg {
  margin-left: 3px;
  margin-top: 2px;
  width: 82px;
  height: 41px;
}

.chaptersContainer {
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.toolsPano {
  width: calc(100% - 110px);
  left: 15px;
  background-color: #688ff4;
  height: 3px;
  position: absolute;
  bottom: 17px;
  border-radius: 1.5px;
}

#cameraControl {
  font-size: 10px;
  background-color: #ffffffbe;
  width: max-content;
  left: 20px;
  height: 18px;
  position: absolute;
  top: 10px;
}

#cameraControl2 {
  font-size: 10px;
  background-color: #ffffffbe;
  width: max-content;
  left: 20px;
  height: 18px;
  position: absolute;
  top: 35px;
}

#forwardButton {
  cursor: pointer;
  font-size: 16px;
  background-color: #ffffffbe;
  width: max-content;
  right: 60px;
  height: 22px;
  position: absolute;
  top: 10px;
}

#downButton {
  cursor: pointer;
  font-size: 16px;
  background-color: #ffffffbe;
  width: max-content;
  right: 60px;
  height: 22px;
  position: absolute;
  top: 35.5px;
}

#leftButton {
  cursor: pointer;
  font-size: 16px;
  background-color: #ffffffbe;
  width: max-content;
  right: 85px;
  height: 22px;
  position: absolute;
  top: 21.5px;
}

#rightButton {
  cursor: pointer;
  font-size: 16px;
  background-color: #ffffffbe;
  width: max-content;
  right: 26px;
  height: 22px;
  position: absolute;
  top: 21.5px;
}

.titlePano {
  position: absolute;
  color: white;
  left: -14px;
  top: -78px;
  transition: all 0.4s !important;
}

.thumbnailPano {
  position: absolute;
  top: -58px;
  left: -45px;
  width: 100px;
  transition: all 0.4s !important;
  // opacity: 0;
}

.panoData {
  li {
    img {
      width: 100px;
      opacity: 0;
    }
  }
}

.chaptersButtons {
  z-index: 999;
  display: block;
  width: 7.5px;
  height: 7.5px;
  border-radius: 3.75px;
  background-color: #ffffff;
  position: absolute;
  top: -2px;
}

.whiteCircle {
  color: rgba(110, 110, 110, 0) !important;
  font-size: 2px;
  border-radius: 3.75px;
}

.backgroundSphere {
  position: absolute;
  top: 11px;
  left: 16px;
  z-index: 10;
  width: 59px;
  height: 59px;
  border-radius: 34px;
  background-color: #0000008c;
}

.arrowGlobeUp {
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 4px;
  opacity: 0.3;
  height: 0;
  width: 0;
  border-right: 10.5px solid transparent;
  border-bottom: 9.5px solid white;
  border-left: 10.5px solid transparent;
  margin: 0px auto 1px auto;
  &:hover {
    opacity: 1;
  }
}

.arrowGlobeRight {
  cursor: pointer;
  position: absolute;
  top: 11px;
  left: 9px;
  opacity: 0.3;
  height: 0px;
  width: 0;
  border-top: 10.5px solid transparent;
  border-left: 9.5px solid white;
  border-bottom: 10.5px solid transparent;
  position: absolute;
  margin-left: 37.5px;
  margin-top: 7px;
  &:hover {
    opacity: 1;
  }
}

.arrowGlobeLeft {
  cursor: pointer;
  position: absolute;
  top: 11px;
  left: 14.5px;
  opacity: 0.3;
  height: 0px;
  width: 0;
  border-top: 10.5px solid transparent;
  border-right: 9.5px solid white;
  border-bottom: 10.5px solid transparent;
  margin-left: -10px;
  margin-top: 7px;
  &:hover {
    opacity: 1;
  }
}

.arrowGlobeDown {
  cursor: pointer;
  position: absolute;
  top: 45px;
  left: 20px;
  transform: rotateX(180deg);
  opacity: 0.3;
  height: 0;
  width: 0;
  border-right: 10.5px solid transparent;
  border-bottom: 9.5px solid white;
  border-left: 10.5px solid transparent;
  margin: auto;
  &:hover {
    opacity: 1;
  }
}
//classes CSS utilisées pour le loading
#progress {
  position: absolute;
  z-index: 999;
  height: 2.5%;
  width: 10%;
  top: 20px;
  left: 27%;
}

#bar {
  height: 20%;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.548);
  margin: -1px 0 0 -1px;
  -webkit-transition: width 0.1s ease;
  transition: width 0.1s ease;
}

#reticule {
  position: absolute;
  z-index: 99;
  background-color: white;
  border-radius: 20%;
  height: 2px;
  width: 2px;
  top: 50%;
  left: 50%;
  border-radius: 20%;
  margin: -1px 0 0 -1px;
  opacity: 0;
}

.finish {
  opacity: 0 !important;
  -webkit-transition: opacity 1s ease;
  transition: opacity 1s ease;
}

body {
  font-family: Verdana, sans-serif;
  margin: 0;
}

* {
  box-sizing: border-box;
}

.row > .column {
  padding: 0 8px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.column {
  float: left;
  width: 25%;
}

.modal {
  display: none;
  position: fixed;
  z-index: 99999;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: black;
}

.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 90%;
  max-width: 1200px;
}

.close {
  color: white;
  position: absolute;
  top: 10px;
  right: 25px;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #999;
  text-decoration: none;
  cursor: pointer;
}

.mySlides {
  display: none;
}

.cursor {
  cursor: pointer;
}

//lightbox
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -50px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  -webkit-user-select: none;
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

img {
  margin-bottom: -4px;
}

.caption-container {
  text-align: center;
  background-color: black;
  padding: 2px 16px;
  color: white;
}

.demo {
  opacity: 0.6;
}

.active,
.demo:hover {
  opacity: 1;
}

img.hover-shadow {
  transition: 0.3s;
}

.hover-shadow:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
