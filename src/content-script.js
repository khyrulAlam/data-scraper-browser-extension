import { tableItem } from "./utils/globalVar";
import { IframeElement } from "./utils/module";
//\/\/\/\/\/\
//\/\/\/\/\/
//\/\\\//\\
//\\

let _iframe = new IframeElement();

//receive massage 🚀
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender) {
  console.log(sender, message);
  let _text = message.text;
  switch (_text) {
    case "create_iframe":
      _iframe.createIframe(message.tabId);
      break;
    case "remove_iframe":
      _iframe.removeIframe();
      break;
    case "start_mouse_move":
      var wk = new FindDesireOption();
      document.addEventListener("mouseover", wk.drawOutline);
      document.addEventListener("mouseout", wk.removeOutline);
      break;
    case "stop_mouse_move":
      let wk2 = new FindDesireOption();
      document.removeEventListener("mouseover", wk2.drawOutline);
      document.removeEventListener("mouseout", wk2.removeOutline);
      let lists = new DesireOptionClassList().getList();
      chrome.runtime.sendMessage({
        text: "class_lists",
        ref: message.ref,
        lists
      });
      break;
    case "mark_element":
      let draw = new DesireOptionClassList();
      if (message.clsName.isElement) {
        let elements = document.querySelectorAll(`${message.clsName.name}`);
        draw.markSelectedClass(elements);
      } else {
        let elements = document.querySelectorAll(`.${message.clsName.name}`);
        draw.markSelectedClass(elements);
      }
      break;
    case "run_script":
      tableItem = [];
      rows = document.querySelectorAll(message.schema.row.rowCls);
      rows.forEach(row => {
        obj = {};
        message.schema.columns.map(item => {
          obj[item.colName] =
            row.querySelector(item.colCls) &&
            row.querySelector(item.colCls).textContent
              ? row.querySelector(item.colCls).textContent
              : "";
        });
        tableItem.push(obj);
      });
      chrome.runtime.sendMessage({
        text: "data_table",
        tableItem
      });
      break;
  }
}

const sendMessage = msg => {
  chrome.runtime.sendMessage(msg);
};
