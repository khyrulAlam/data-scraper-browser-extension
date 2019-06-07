import { chromeId, schemaObj } from "./globalVar";
var sTarget;
var prevElementFlag;

export class FindDesireOption {
  drawOutline(ev) {
    ev.target.style.outline = "2px solid #ffc107";
    sTarget = ev.target;
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
    return {
      attributes: [...sTarget["classList"]],
      element: sTarget.localName
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

export class ElementsCreateUtility {
  constructor() {
    this.count = 1;
  }
  addNewColumnField(element) {
    this.count++;
    element.innerHTML = `<div class="col-12">
        <input type="text" class="form-control" name="colName" placeholder="Column Name">
      </div>
      <div class="col-9">
          <input type="text" class="form-control" name="colCls" placeholder="Class Name">
      </div>
      <div class="col-3">
          <button type="button" class="btn btn-primary mouseMove-col" data-col="colNum${
            this.count
          }">Drag</button>
      </div>
      <div class="class-checkbox-dom">
      </div>
    </div>`;
  }
  createTable(tableElement) {
    tableElement.classList.add("table", "table-bordered");
    tableElement.innerHTML += `<thead id="tbhead"><tr><td>No.</td></tr></thead><tbody id="tbbody"></tbody>`;
  }
  tableHead(obj) {
    Object.keys(obj).forEach(key => {
      document.querySelector("#tbhead tr").innerHTML += `<th>${key}</th>`;
    });
  }
  tableBody(tableItems) {
    tableItems.map((item, i) => {
      let tr = document.createElement("tr");
      tr.innerHTML += `<td>${i + 1}</td>`;
      Object.keys(item).forEach(key => {
        tr.innerHTML += `<td>${item[key]}</td>`;
      });
      document.querySelector("#tbbody").append(tr);
    });
  }
}

export class RunTimeSendMsg {
  constructor() {
    this.tabParams = {
      active: true,
      currentWindow: true
    };
  }
  send(msg) {
    chrome.tabs.query(this.tabParams, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, msg);
    });
  }
}

export class InputCheckList extends RunTimeSendMsg {
  constructor(element, lists) {
    super();
    this.element = element;
    this.lists = lists;
    this.element.innerHTML = "";
  }
  makeCheckBox() {
    if (this.lists.attributes && this.lists.attributes.length === 0) {
      let obj = {
        name: this.lists.element,
        isElement: true
      };
      this.element.innerHTML += `<div class="form-check">
      <input class="form-check-input" type="radio" name="cls" value="${encodeURIComponent(
        JSON.stringify(obj)
      )}">
      <label class="form-check-label">
        ${this.lists.element}
      </label>
    </div>`;
      this.element.innerHTML += `<button type="button" class="btn btn-warning mt-4" id="doneSelect">Done</button>`;
    } else {
      this.lists.attributes.forEach(cls => {
        let obj = {
          name: cls,
          isElement: false
        };
        this.element.innerHTML += `<div class="form-check">
        <input class="form-check-input" type="radio" name="cls" value="${encodeURIComponent(
          JSON.stringify(obj)
        )}">
        <label class="form-check-label">
          ${cls}
        </label>
      </div>`;
      });
      this.element.innerHTML += `<button type="button" class="btn btn-warning mt-4" id="doneSelect">Done</button>`;
    }
  }
  selectClass() {
    this.element.addEventListener("change", e => {
      let val = document.querySelector("input[name=cls]:checked").value;
      let rowCls = document.querySelector("input[name=rowCls]");
      let clsName = JSON.parse(decodeURIComponent(val));
      if (clsName.isElement) {
        rowCls.value = clsName.name;
      } else {
        rowCls.value = "." + clsName.name;
      }
      let msg = {
        text: "mark_element",
        clsName
      };
      this.send(msg);
    });
    let doneSelect = document.querySelector("#doneSelect");
    doneSelect.addEventListener("click", function(e) {
      let rowName = document.querySelector("input[name=rowName]").value
        ? document.querySelector("input[name=rowName]").value
        : "row";
      let rowCls = document.querySelector("input[name=rowCls]").value;
      schemaObj.schema["row"] = { rowName, rowCls };
      e.target.parentElement.innerHTML = "";
    });
  }
  selectClassForCol(parentEl) {
    this.element.addEventListener("change", e => {
      let val = this.element.querySelector("input[name=cls]:checked").value;
      let colClass = parentEl.querySelector("input[name=colCls]");
      let clsName = JSON.parse(decodeURIComponent(val));
      clsName.isElement
        ? (colClass.value = clsName.name)
        : (colClass.value = "." + clsName.name);
      let msg = {
        text: "mark_element",
        clsName
      };
      this.send(msg);
    });
    let doneSelect = document.querySelector("#doneSelect");
    doneSelect.addEventListener("click", function(e) {
      let colName = parentEl.querySelector("input[name=colName]").value
        ? parentEl.querySelector("input[name=colName]").value
        : "colName";
      let colCls = parentEl.querySelector("input[name=colCls]").value;
      schemaObj.schema.columns.push({ colName, colCls });
      e.target.parentElement.innerHTML = "";
    });
  }
}
