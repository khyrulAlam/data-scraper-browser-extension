import {
  IframeElement,
  FindDesireOption,
  DesireOptionClassList
} from "./utils/module";
let tableItem = [];

let _iframe = new IframeElement();
let wk = new FindDesireOption();
let dsOption = new DesireOptionClassList();

//receive massage 🚀
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender) {
  let _text = message.text;
  switch (_text) {
    case "create_iframe":
      _iframe.createIframe(message.tabId);
      break;
    case "remove_iframe":
      _iframe.removeIframe();
      break;
    case "start_mouse_move":
      document.addEventListener("mouseover", wk.drawOutline);
      document.addEventListener("mouseout", wk.removeOutline);
      break;
    case "stop_mouse_move":
      document.removeEventListener("mouseover", wk.drawOutline);
      document.removeEventListener("mouseout", wk.removeOutline);
      let lists = dsOption.getList();
      sendMessage({
        text: "class_lists",
        ref: message.ref,
        lists
      });
      break;
    case "mark_element":
      let elements = document.querySelectorAll(`${message.clsName.name}`);
      dsOption.markSelectedClass(elements);
      break;
    case "parent_lookup":
      let dsSelected = document.querySelector(".ds_selected");

      if (dsSelected) {
        dsSelected.classList.remove("ds_selected");
        let lookupClass = dsSelected.parentElement;
        let attributesLists = [...lookupClass["classList"]];
        lookupClass.classList.add("ds_selected");
        let msg = {
          text: "class_lists",
          ref: message.ref,
          lists: {
            attributes: attributesLists,
            element: lookupClass.localName
          }
        };
        sendMessage(msg);
      }
      break;
    case "sibling_lookup":
      let prevEl = document.querySelectorAll(`${message.elementRef.element}`)[
        message.elementRef.prevIndexNum
      ];
      let el = document.querySelectorAll(`${message.elementRef.element}`)[
        message.elementRef.indexNum
      ];
      if (el) {
        el.style.outline = "5px solid #ffc107";
        prevEl.style.outline = "";
      }
      break;
    case "run_script":
      var rows;

      if (message.schema.row.rowCls.includes("eq")) {
        let cResult = getSiblingIndex(message.schema.row.rowCls);
        rows = document.querySelectorAll(cResult.className)[
          cResult.indexNumber
        ];
      } else {
        rows = document.querySelectorAll(message.schema.row.rowCls);
      }

      if (rows) {
        if (rows.length >= 0) {
          scrapDataFromSchema(rows, message.schema.columns).then(res => {
            sendMessage({
              text: "data_table",
              tableItem: res
            });
          });
        } else {
          scrapDataFromSchemaForSingleRow(rows, message.schema.columns).then(
            res => {
              sendMessage({
                text: "data_table",
                tableItem: [res]
              });
            }
          );
        }
      }
      break;
    case "run_script_from_popup":
      var rows;
      if (message.schema.row.rowCls.includes("eq")) {
        let cResult = getSiblingIndex(message.schema.row.rowCls);
        rows = document.querySelectorAll(cResult.className)[
          cResult.indexNumber
        ];
      } else {
        rows = document.querySelectorAll(message.schema.row.rowCls);
      }
      if (rows) {
        if (rows.length >= 0) {
          scrapDataFromSchema(rows, message.schema.columns).then(res => {
            sendMessage({
              text: "create_download_tab",
              website_url: location.origin,
              name: message.name,
              tableItem: res
            });
          });
        } else {
          scrapDataFromSchemaForSingleRow(rows, message.schema.columns).then(
            res => {
              sendMessage({
                text: "create_download_tab",
                website_url: location.origin,
                name: message.name,
                tableItem: [res]
              });
            }
          );
        }
      }
      break;
    case "run_script_for_download":
      var rows;
      if (message.schema.row.rowCls.includes("eq")) {
        let cResult = getSiblingIndex(message.schema.row.rowCls);
        rows = document.querySelectorAll(cResult.className)[
          cResult.indexNumber
        ];
      } else {
        rows = document.querySelectorAll(message.schema.row.rowCls);
      }
      if (rows) {
        if (rows.length >= 0) {
          scrapDataFromSchema(rows, message.schema.columns).then(res => {
            sendMessage({
              text: "new_data_send_to_download_page",
              reciverId: message.senderId,
              name: message.name,
              tableItem: res
            });
          });
        } else {
          scrapDataFromSchemaForSingleRow(rows, message.schema.columns).then(
            res => {
              sendMessage({
                text: "new_data_send_to_download_page",
                reciverId: message.senderId,
                name: message.name,
                tableItem: [res]
              });
            }
          );
        }
      }
      break;
    case "save_schema":
      dsOption.removeSelectedClass();
      break;
  }
}

const sendMessage = msg => {
  chrome.runtime.sendMessage(msg);
};

const getSiblingIndex = cnStr => {
  let splitStr = cnStr.split("-eq(");
  let className = splitStr[0];
  let indexNumber = Number(splitStr[1].replace(/\)/, ""));
  return {
    className,
    indexNumber
  };
};

const scrapDataFromSchema = async (rows, columns) => {
  let result = [];
  rows.forEach(row => {
    var obj = {};
    columns.map(item => {
      if (item.contentType === "text") {
        if (item.colCls.includes("eq")) {
          var cResult = getSiblingIndex(item.colCls);
          obj[item.colName] =
            row.querySelectorAll(cResult.className)[cResult.indexNumber] &&
            row.querySelectorAll(cResult.className)[cResult.indexNumber]
              .textContent
              ? row
                  .querySelectorAll(cResult.className)
                  [cResult.indexNumber].textContent.replace(/\n/g, "")
                  .trim()
              : "";
        } else {
          obj[item.colName] =
            row.querySelector(item.colCls) &&
            row.querySelector(item.colCls).textContent
              ? row
                  .querySelector(item.colCls)
                  .textContent.replace(/\n/g, "")
                  .trim()
              : "";
        }
      } else if (item.contentType === "url") {
        let elCol;
        if (item.colCls.includes("eq")) {
          var cResult = getSiblingIndex(item.colCls);
          elCol = row.querySelectorAll(cResult.className)[cResult.indexNumber];
        } else {
          elCol = row.querySelector(item.colCls);
        }
        if (elCol.tagName !== "A") {
          obj[item.colName] =
            elCol.querySelector("a") && elCol.querySelector("a").href
              ? elCol.querySelector("a").href
              : "";
        } else {
          obj[item.colName] = elCol && elCol.href ? elCol.href : "";
        }
      } else if (item.contentType === "html") {
        let elHtml;
        if (item.colCls.includes("eq")) {
          var cResult = getSiblingIndex(item.colCls);
          elHtml = row.querySelectorAll(cResult.className)[cResult.indexNumber];
        } else {
          elHtml = row.querySelector(item.colCls);
        }
        obj[item.colName] = elHtml && elHtml.innerHTML ? elHtml.innerHTML : "";
      }
    });
    result.push(obj);
  });
  return result;
};

const scrapDataFromSchemaForSingleRow = async (rows, columns) => {
  var obj = {};
  columns.map(item => {
    if (item.contentType === "text") {
      if (item.colCls.includes("eq")) {
        var cResult = getSiblingIndex(item.colCls);
        obj[item.colName] =
          rows.querySelector(cResult.className)[cResult.indexNumber] &&
          rows.querySelector(cResult.className)[cResult.indexNumber].textContent
            ? rows.querySelector(cResult.className)[cResult.indexNumber]
                .textContent
            : "";
      } else {
        obj[item.colName] =
          rows.querySelector(item.colCls) &&
          rows.querySelector(item.colCls).textContent
            ? rows.querySelector(item.colCls).textContent
            : "";
      }
    } else if (item.contentType === "url") {
      let elCol;
      if (item.colCls.includes("eq")) {
        var cResult = getSiblingIndex(item.colCls);
        elCol = rows.querySelector(cResult.className)[cResult.indexNumber];
      } else {
        elCol = rows.querySelector(item.colCls);
      }
      if (elCol.tagName !== "A") {
        obj[item.colName] =
          elCol.querySelector("a") && elCol.querySelector("a").href
            ? elCol.querySelector("a").href
            : "";
      } else {
        obj[item.colName] = elCol && elCol.href ? elCol.href : "";
      }
    } else if (item.contentType === "html") {
      let elHtml;
      if (item.colCls.includes("eq")) {
        var cResult = getSiblingIndex(item.colCls);
        elHtml = rows.querySelector(cResult.className)[cResult.indexNumber];
      } else {
        elHtml = rows.querySelector(item.colCls);
      }
      obj[item.colName] = elHtml && elHtml.innerHTML ? elHtml.innerHTML : "";
    }
  });
  return obj;
};
