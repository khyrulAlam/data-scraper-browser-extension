import { chromeId, schemaObj } from "./globalVar";
import { utils, write, writeFile } from "xlsx";
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
    let isPrevSelected = document.querySelector(".ds_selected");
    if (isPrevSelected) isPrevSelected.classList.remove("ds_selected");
    let attributesLists = [...sTarget["classList"]];
    sTarget.classList.add("ds_selected");
    return {
      attributes: attributesLists,
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
  removeSelectedClass() {
    if (prevElementFlag) {
      prevElementFlag.forEach(el => {
        el.style.outline = "none";
      });
    }
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
    if (element) {
      element.parentNode.removeChild(element);
    }
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
      <div class="col-12">
          <select name="contentType" class="form-control">
              <option value="text">Text</option>
              <option value="url">URL</option>
              <option value="html">HTML</option>
          </select>
      </div>
      <div class="col-9">
          <input type="text" class="form-control" name="colCls" placeholder="Class Name">
      </div>
      <div class="col-3">
          <button type="button" class="btn btn-primary mouseMove-col" data-col="colNum${this.count}">🖱</button>
      </div>
      <div class="col-12 class-checkbox-dom">
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
  makeCheckBox(ref) {
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
      this.element.innerHTML += `
        <div class="mt-2 p-2" style="border: solid 1px #17a2b840;">
          <button type="button" class="btn btn-outline-info btn-sm" id="lookup_parent" data-lookfor="${this.lists.element}" data-ref="${ref}">⇯ Parent ⇯</button>
          <div class="pt-2 mt-3" style="border-top: 1px solid #0000002b;">
            Choose Sibling-  
            <button type="button" id="sibling-up" class="btn btn-outline-info btn-sm">⏶</button>
            <button type="button" id="sibling-down" class="btn btn-outline-info btn-sm">⏷</button>
            eq-<span id="sibling-index" data-sibling="${this.lists.element}"></span>
          </div>
        </div>
      `;
      this.element.innerHTML += `<button type="button" class="btn btn-outline-warning mt-3" id="doneSelect">Done</button>`;
    } else {
      this.lists.attributes.forEach(cls => {
        let obj = {
          name: `.${cls}`,
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
      this.element.innerHTML += `
        <div class="mt-2 p-2" style="border: solid 1px #17a2b840;">
          <button type="button" class="btn btn-outline-info btn-sm" id="lookup_parent" data-lookfor="${this.lists.attributes[0]}" data-ref="${ref}">⇯ Parent ⇯</button>
          <div class="pt-2 mt-3" style="border-top: 1px solid #0000002b;">
            Choose Sibling-  
            <button type="button" id="sibling-up" class="btn btn-outline-info btn-sm">⏶</button>
            <button type="button" id="sibling-down" class="btn btn-outline-info btn-sm">⏷</button>
            <span id="sibling-index" data-sibling=".${this.lists.attributes[0]}"></span>
          </div>
        </div>
      `;
      this.element.innerHTML += `<button type="button" class="btn btn-outline-warning mt-3" id="doneSelect">Done</button>`;
    }
  }
  selectClass() {
    let rowCls = document.querySelector("input[name=rowCls]");
    this.element.addEventListener("change", e => {
      let val = document.querySelector("input[name=cls]:checked").value;
      let clsName = JSON.parse(decodeURIComponent(val));
      rowCls.value = clsName.name;
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
    this.lookupParent();
    this.lookupSibling(rowCls);
  }
  selectClassForCol(parentEl, colIndex) {
    let colClass = parentEl.querySelector("input[name=colCls]");
    this.element.addEventListener("change", e => {
      let val = this.element.querySelector("input[name=cls]:checked").value;
      let clsName = JSON.parse(decodeURIComponent(val));
      colClass.value = clsName.name;
      clsName.name = `${schemaObj.schema.row.rowCls} ${clsName.name}`;
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
      let contentType = parentEl.querySelector("select[name=contentType]")
        .value;
      schemaObj.schema.columns[colIndex] = { colName, colCls, contentType };
      e.target.parentElement.innerHTML = "";
    });
    this.lookupParent();
    this.lookupSibling(colClass);
  }

  lookupParent() {
    let lookup_parent = document.querySelector("#lookup_parent");
    lookup_parent.addEventListener("click", e => {
      let lookupFor = e.target.dataset.lookfor;
      let ref = e.target.dataset.ref;
      let msg = {
        text: "parent_lookup",
        clsName: lookupFor,
        ref
      };
      this.send(msg);
    });
  }

  lookupSibling(inputEl) {
    let siblingUp = document.querySelector("#sibling-up");
    let siblingDown = document.querySelector("#sibling-down");
    let siblingIndex = document.querySelector("#sibling-index");
    let siblingLookupFor = siblingIndex.dataset.sibling;

    siblingUp.addEventListener("click", () => {
      let index = siblingIndex.innerText;
      if (index === "") {
        siblingIndex.innerText = 0;
        inputEl.value = `${siblingLookupFor}-eq(${0})`;
      } else {
        siblingIndex.innerText = Number(index) + 1;
        inputEl.value = `${siblingLookupFor}-eq(${Number(index) + 1})`;
        let msg = {
          text: "sibling_lookup",
          elementRef: {
            element: siblingLookupFor,
            indexNum: Number(index) + 1,
            prevIndexNum: Number(index)
          }
        };
        this.send(msg);
      }
    });

    siblingDown.addEventListener("click", () => {
      let index = Number(siblingIndex.innerText);
      if (index === "") {
        siblingIndex.innerText = "";
      } else if (index === 0) {
        siblingIndex.innerText = "";
        inputEl.value = "";
      } else {
        siblingIndex.innerText = Number(index) - 1;
        inputEl.value = `${siblingLookupFor}-eq(${Number(index) - 1})`;
        let msg = {
          text: "sibling_lookup",
          elementRef: {
            element: siblingLookupFor,
            indexNum: Number(index) - 1,
            prevIndexNum: Number(index)
          }
        };
        this.send(msg);
      }
    });
  }
}

export class StoreData {
  constructor(url) {
    this.urlInfo = new URL(url);
    this.hostName = this.urlInfo.hostname
      .replace(/\./g, "_")
      .trim()
      .toString();
    this.data = null;
  }

  getKey() {
    if (!this.hostName) return false;
    return this.hostName;
  }

  saveData(data) {
    chrome.storage.sync.get([this.hostName], result => {
      let preData = result || {};
      if (!(this.hostName in preData)) {
        preData[this.hostName] = {};
      }
      Object.keys(preData).forEach(key => {
        preData[key][data.name.replace(/ /g, "_")] = data;
        chrome.storage.sync.set(preData, function() {
          console.log("save");
        });
      });
    });
  }
}

export class RandomId {
  ID() {
    return (
      "joyBangla_" +
      Math.random()
        .toString(36)
        .slice(8)
    );
  }
}

export class DownloaderHelper extends RandomId {
  CreateTable(element, data) {
    let ws = utils.json_to_sheet(data);
    let htmlString = utils.sheet_to_html(ws, {
      id: "data-table",
      editable: false
    });
    element.innerHTML = htmlString;
    document
      .querySelector("#data-table")
      .classList.add("table", "table-striped", "table-sm", "table-bordered");
  }
  Download(type, fn, dl) {
    var elt = document.getElementById("shadow-table");
    var wb = utils.table_to_book(elt, { sheet: "Data Scraper Extension" });
    var name = this.ID();
    return dl
      ? write(wb, { bookType: type, bookSST: true, type: "base64" })
      : writeFile(wb, fn || name + "." + (type || "xlsx"));
  }
  CreateShadowTable(element, data) {
    let ws = utils.json_to_sheet(data);
    let htmlString = utils.sheet_to_html(ws, {
      id: "shadow-table",
      editable: false
    });
    element.innerHTML = htmlString;
  }
}
