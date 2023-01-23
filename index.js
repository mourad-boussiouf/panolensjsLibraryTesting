async function loadAll() {
    await this.threeload();
    await this.panoload();
    await this.loadScript();
    this.panolandIsRunning = true;
  }

  async function  callStackHandler() {
    return await new Promise((res) => setTimeout(res, 0));
  }
  async function  b(c) {
    await this.callStackHandler();
    if (document.getElementById(c).className !== "1") {
      await this.b(c);
    } else if (document.getElementById(c).className === "1") {
      return new Promise((resolve) => {
        resolve("ok");
      });
    }
  }

  async function  showthumbnails(index) {
    this.currentThumnail = index;
  }

  async function  threeload() {
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

  async function  panoload() {
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

  async function  loadScript() {
    require("../assets/files/visite001.js");
    await this.b("loadxyz");
    return new Promise((resolve) => {
      resolve("ok");
    });
  }
