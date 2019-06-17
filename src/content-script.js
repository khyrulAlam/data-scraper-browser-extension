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
      if (message.clsName.isElement) {
        let elements = document.querySelectorAll(`${message.clsName.name}`);
        dsOption.markSelectedClass(elements);
      } else {
        let elements = document.querySelectorAll(`.${message.clsName.name}`);
        dsOption.markSelectedClass(elements);
      }
      break;
    case "run_script":
      tableItem = [];
      var rows = document.querySelectorAll(message.schema.row.rowCls);
      if (rows) {
        rows.forEach(row => {
          var obj = {};
          message.schema.columns.map(item => {
            if (item.contentType === "text") {
              obj[item.colName] =
                row.querySelector(item.colCls) &&
                row.querySelector(item.colCls).textContent
                  ? row.querySelector(item.colCls).textContent
                  : "";
            } else if (item.contentType === "url") {
              let elCol = row.querySelector(item.colCls);
              if (elCol.tagName !== "A") {
                obj[item.colName] =
                  elCol.querySelector("a") && elCol.querySelector("a").href
                    ? elCol.querySelector("a").href
                    : "";
              } else {
                obj[item.colName] = elCol && elCol.href ? elCol.href : "";
              }
            } else if (item.contentType === "html") {
              obj[item.colName] =
                row.querySelector(item.colCls) &&
                row.querySelector(item.colCls).innerHTML
                  ? row.querySelector(item.colCls).innerHTML
                  : "";
            }
          });
          tableItem.push(obj);
        });
        sendMessage({
          text: "data_table",
          tableItem
        });
      }
      break;
    case "run_script_from_popup":
      tableItem = [];
      var rows = document.querySelectorAll(message.schema.row.rowCls);
      if (rows) {
        rows.forEach(row => {
          var obj = {};
          message.schema.columns.map(item => {
            if (item.contentType === "text") {
              obj[item.colName] =
                row.querySelector(item.colCls) &&
                row.querySelector(item.colCls).textContent
                  ? row
                      .querySelector(item.colCls)
                      .textContent.replace(/\n/g, "")
                      .trim()
                  : "";
            } else if (item.contentType === "url") {
              let elCol = row.querySelector(item.colCls);
              if (elCol.tagName !== "A") {
                obj[item.colName] =
                  elCol.querySelector("a") && elCol.querySelector("a").href
                    ? elCol.querySelector("a").href
                    : "";
              } else {
                obj[item.colName] = elCol && elCol.href ? elCol.href : "";
              }
            } else if (item.contentType === "html") {
              obj[item.colName] =
                row.querySelector(item.colCls) &&
                row.querySelector(item.colCls).innerHTML
                  ? row.querySelector(item.colCls).innerHTML
                  : "";
            }
          });
          tableItem.push(obj);
        });
        sendMessage({
          text: "create_download_tab",
          website_url: location.origin,
          tableItem
        });
      }
      break;
    case "run_script_for_download":
      tableItem = [];
      var rows = document.querySelectorAll(message.schema.row.rowCls);
      if (rows) {
        rows.forEach(row => {
          var obj = {};
          message.schema.columns.map(item => {
            if (item.contentType === "text") {
              obj[item.colName] =
                row.querySelector(item.colCls) &&
                row.querySelector(item.colCls).textContent
                  ? row
                      .querySelector(item.colCls)
                      .textContent.replace(/\n/g, "")
                      .trim()
                  : "";
            } else if (item.contentType === "url") {
              let elCol = row.querySelector(item.colCls);
              if (elCol.tagName !== "A") {
                obj[item.colName] =
                  elCol.querySelector("a") && elCol.querySelector("a").href
                    ? elCol.querySelector("a").href
                    : "";
              } else {
                obj[item.colName] = elCol && elCol.href ? elCol.href : "";
              }
            } else if (item.contentType === "html") {
              obj[item.colName] =
                row.querySelector(item.colCls) &&
                row.querySelector(item.colCls).innerHTML
                  ? row.querySelector(item.colCls).innerHTML
                  : "";
            }
          });
          tableItem.push(obj);
        });
        sendMessage({
          text: "new_data_send_to_download_page",
          reciverId: message.senderId,
          tableItem
        });
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
