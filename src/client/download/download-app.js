import "./style.css";
import { DownloaderHelper } from "../../utils/module";

let downloadHelper = new DownloaderHelper();
let senderId = null;

//select element
let isLoading = document.querySelector("#isLoading");
let dom_viewer = document.querySelector("#dom_viewer");
let resultTable = document.querySelector("#result_table");
let downloadData = document.querySelector("#download_data");
let downloadOption = document.querySelector("#download_option");

// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//   console.log(tabs);
// });

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender) {
  senderId = message.senderId;
  let text = message.text;
  switch (text) {
    case "send_table_data_to_download_page":
      downloadHelper.CreateTable(resultTable, message.tableItem);
      isLoading.style.visibility = "hidden";
      dom_viewer.style.visibility = "visible";
      break;
  }
}

downloadData.addEventListener("click", () => {
  if (!senderId) {
    window.close();
    return;
  }
  let type = downloadOption.options[downloadOption.selectedIndex].value;
  downloadHelper.Download(type);
});

//   chrome.tabs.sendMessage(senderId, { text: "message from other page" });
