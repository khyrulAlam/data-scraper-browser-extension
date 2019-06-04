import { chromeId } from "./globalVar";

export class FindDesireOption {
  drawOutline(ev) {
    ev.target.style.outline = "2px solid #ffc107";
    __sTarget = ev.target;
  }
  removeOutline(ev) {
    ev.target.style.outline = "";
  }
}

export class DesireOptionClassList {
  constructor() {
    this.attributes = [];
    this.element = "";
  }
  getList() {
    this.attributes.push(...__sTarget["classList"]);
    this.element = __sTarget.localName;
    return {
      attributes: this.attributes,
      element: this.element
    };
  }
  markSelectedClass(element) {
    if (prevElementFlag) {
      prevElementFlag.forEach(el => {
        el.style.outline = "none";
      });
    }
    element.forEach(el => {
      el.style.outline = "1px solid red";
    });
    prevElementFlag = element;
  }
}

export class IframeElement {
  constructor() {
    this.elId = "foxex-root-container";
    this.iframeId = "iframe-container";
  }
  createIframe(tabId) {
    let __foxex_root_container = document.createElement("div");
    __foxex_root_container.id = this.elId;
    __foxex_root_container.style.position = "fixed";
    __foxex_root_container.style["z-index"] = 2147483647;
    __foxex_root_container.style["top"] = 0;
    __foxex_root_container.style["right"] = 0;
    __foxex_root_container.style["width"] = "315px";
    __foxex_root_container.style["height"] = "100vh";

    // ↕️ arrow
    let arrowControl = document.createElement("div");
    arrowControl.id = "controlArrow";
    arrowControl.style["position"] = "absolute";
    arrowControl.style["background"] = "#0073ca";
    arrowControl.style["cursor"] = "pointer";
    arrowControl.style["width"] = "30px";
    arrowControl.style["height"] = "30px";
    arrowControl.style["left"] = "-30px";
    arrowControl.style["color"] = "#fff";
    arrowControl.style["display"] = "flex";
    arrowControl.style["align-items"] = "center";
    arrowControl.style["justify-content"] = "center";
    arrowControl.innerHTML = "👈";
    __foxex_root_container.append(arrowControl);
    setTimeout(() => {
      let controlArrow = document.querySelector("#controlArrow");
      controlArrow.addEventListener("click", e => {
        if (__foxex_root_container.style.width === "315px") {
          arrowControl.innerHTML = "👉";
          __foxex_root_container.style["width"] = "60vw";
        } else {
          arrowControl.innerHTML = "👈";
          __foxex_root_container.style["width"] = "315px";
        }
      });
    }, 1000);

    let __foxex_ifElement = document.createElement("iframe");
    __foxex_ifElement.allow = "autoplay";
    __foxex_ifElement.id = this.iframeId;
    __foxex_ifElement.style["display"] = "block";
    __foxex_ifElement.style["height"] = "100vh";
    __foxex_ifElement.style["width"] = "100%";
    __foxex_ifElement.style["border"] = "none";
    __foxex_ifElement.style["box-shadow"] = "4px 0px 16px 4px #0000001a";

    __foxex_root_container.append(__foxex_ifElement);
    document.getElementsByTagName("body")[0].append(__foxex_root_container);
    __foxex_ifElement.setAttribute(
      "src",
      `chrome-extension://${chromeId}/client/index.html?id=${tabId}`
    );
  }
  removeIframe() {
    let element = document.getElementById(this.elId);
    element.parentNode.removeChild(element);
  }
}
