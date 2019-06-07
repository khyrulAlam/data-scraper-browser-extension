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
      let rows = document.querySelectorAll(message.schema.row.rowCls);
      rows.forEach(row => {
        let obj = {};
        message.schema.columns.map(item => {
          obj[item.colName] =
            row.querySelector(item.colCls) &&
            row.querySelector(item.colCls).textContent
              ? row.querySelector(item.colCls).textContent
              : "";
        });
        tableItem.push(obj);
      });
      sendMessage({
        text: "data_table",
        tableItem
      });
      break;
  }
}

const sendMessage = msg => {
  chrome.runtime.sendMessage(msg);
};
