import "./main.css";
import {
  ElementsCreateUtility,
  RunTimeSendMsg,
  InputCheckList
} from "../utils/module";
import { schemaObj, storeValue } from "../utils/globalVar";

let elUtility = new ElementsCreateUtility();
let runtimeSendMessage = new RunTimeSendMsg();
let columnCount = { ref: "" };

/* ***********************
👊  Event Handle 👊
************************** */

// 👉 schema Name
let schemaName = document.querySelector("#schemaName");
schemaName.addEventListener("keyup", e => {
  schemaObj.name = e.target.value.trim();
});

// 👉 Send mouse event to content page
let startPickMouse = document.querySelector("#startPickMouse");
startPickMouse.addEventListener("click", e => {
  let msg = {
    text: "start_mouse_move"
  };
  runtimeSendMessage.send(msg);
  columnCount.ref = "row_name";
  document.addEventListener("keypress", stopMouseEvent);
});

// 👉 send Stop Mouse event to content page
function stopMouseEvent(ev) {
  if (ev.charCode === 115 && ev.code === "KeyS") {
    let msg = {
      text: "stop_mouse_move",
      ref: columnCount.ref
    };
    runtimeSendMessage.send(msg);
    document.removeEventListener("keypress", stopMouseEvent);
  }
}

// 👉 add another column field
let addAnotherDom = document.querySelector("#addAnotherDom");
let addMoreCol = document.querySelector("#addMoreCol");
addMoreCol.addEventListener("click", e => {
  let newItem = document.createElement("div");
  elUtility.addNewColumnField(newItem);
  let classList = ["form-row", "mt-2", `colNum${elUtility.count}`];
  newItem.classList.add(...classList);
  addAnotherDom.appendChild(newItem);
  mouseMoveEventReady();
});
// 👉 new column mouse event
mouseMoveEventReady();
function mouseMoveEventReady() {
  let mouseMoveCol = document.querySelectorAll(".mouseMove-col");
  mouseMoveCol.forEach(el =>
    el.addEventListener("click", e => {
      let msg = {
        text: "start_mouse_move"
      };
      runtimeSendMessage.send(msg);
      columnCount.ref = e.target.dataset.col;
      document.addEventListener("keypress", stopMouseEvent);
    })
  );
}

// 👉 run schema message to content page;
let runJalal = document.querySelector("#jalalRun");
runJalal.addEventListener("click", e => {
  let msg = {
    text: "run_script",
    schema: schemaObj.schema
  };
  runtimeSendMessage.send(msg);
});

// 📡 Receive Message 📡
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender) {
  // console.log("========= option page 🐌 =========== ");
  // console.log(message);
  // console.log("========= option page 🐌 =========== ");
  let _text = message.text;
  if (_text === "class_lists") {
    if (message.ref === "row_name") {
      let checkboxDom = document.querySelector(".checkbox-dom");
      let inputBox = new InputCheckList(checkboxDom, message.lists);
      inputBox.makeCheckBox();
      inputBox.selectClass();
    } else {
      let sec = document.querySelector(`.${message.ref}`);
      let checkboxDom = sec.querySelector(".class-checkbox-dom");
      let inputBox = new InputCheckList(checkboxDom, message.lists);
      inputBox.makeCheckBox();
      inputBox.selectClassForCol(sec);
    }
  }
  if (_text === "data_table") {
    console.table(message.tableItem);
    let resultTable = document.querySelector("#resultTable");
    resultTable.innerHTML = "";
    resultTable.style["font-size"] = "12px";
    let table = document.createElement("table");
    elUtility.createTable(table);
    resultTable.append(table);
    elUtility.tableHead(message.tableItem[0]);
    elUtility.tableBody(message.tableItem);
  }
}

// save schema on chrome store 🏪
let saveSchema = document.querySelector("#saveSchema");
saveSchema.addEventListener("click", function() {
  console.log(storeValue);
});
