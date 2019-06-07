import "./main.css";
import { tabParams, storeValue } from "../utils/globalVar";

//element selector
let newSchema = document.querySelector("#newSchema");

// send message to content-script for new schema
newSchema.addEventListener("click", e => {
  chrome.tabs.query(tabParams, function(tabs) {
    var obj = {
      text: "create_iframe",
      tabId: tabs[0].id
    };
    chrome.runtime.sendMessage(obj);
    chrome.tabs.sendMessage(tabs[0].id, obj);
    setTimeout(() => {
      window.close();
    }, 400);
  });
});

chrome.tabs.query(tabParams, function(tabs) {
  let url = new URL(tabs[0].url);
  if (url.protocol === "file:") {
    document.body.innerHTML =
      "<h3>Something wrong. your url must be http or https protocol. </h3>";
  } else {
    let host = url.hostname.replace(/\./g, "_");
    chrome.storage.sync.get([host], function(res) {
      storeValue[host] = res[host] || [];
      console.log("host", host, "store value", storeValue);
    });
  }
});
