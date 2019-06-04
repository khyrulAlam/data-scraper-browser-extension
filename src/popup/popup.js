import "./main.css";
import { tabParams } from "../utils/globalVar";

//element selector
let newSchema = document.querySelector("#newSchema");

// send message to content-script for new schema
newSchema.addEventListener("click", e => {
  chrome.tabs.query(tabParams, function(tabs) {
    var obj = {
      text: "create_iframe",
      tabId: tabs[0].id
    };
    chrome.tabs.sendMessage(tabs[0].id, obj);
    setTimeout(() => {
      window.close();
    }, 400);
  });
});
