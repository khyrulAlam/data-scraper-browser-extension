import "./style.css";
import { DownloaderHelper } from "../../utils/module";

let downloadHelper = new DownloaderHelper();
let senderId = null;
let storeValue = null;
//select element
let isLoading = document.querySelector("#isLoading");
let dom_viewer = document.querySelector("#dom_viewer");
let resultTable = document.querySelector("#result_table");
let downloadData = document.querySelector("#download_data");
let downloadOption = document.querySelector("#download_option");
let schemaList = document.querySelector("#schema_list");

// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//   console.log(tabs);
// });

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender) {
  senderId = message.senderId;
  let text = message.text;
  switch (text) {
    case "send_table_data_to_download_page":
      schemaList.innerHTML += `<p class="text-center badge-warning">Website 👉 ${
        message.website_url
      }</p>`;
      let _key = new URL(message.website_url).hostname.split(".").join("_");
      chrome.storage.sync.get(_key, result => {
        if (_key in result) {
          storeValue = result[_key];
          let data = result[_key];
          Object.keys(data).forEach(key => {
            schemaList.innerHTML += `
            <div class="article">
                <h3>${data[key].name}</h3>
                <p>${data[key].schema.row.rowName}</p>
                <button class="run" data-key="${key}">run💥</button>
            </div>
            `;
          });
        }
        runScript();
      });

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

let runScript = () => {
  let run = document.querySelectorAll(".run");
  run.forEach(el =>
    el.addEventListener("click", e => {
      console.log(storeValue[e.target.dataset.key]);
    })
  );
};
