import "./style.css";
import { DownloaderHelper } from "../../utils/module";

let downloadHelper = new DownloaderHelper();
let senderId = null;
let storeValue = null;
let tabId = null;
let storeDownloadDate = {};
//select element
let isLoading = document.querySelector("#isLoading");
let dom_viewer = document.querySelector("#dom_viewer");
let resultTable = document.querySelector("#result_table");
let downloadTable = document.querySelector("#download_table");
let downloadData = document.querySelector("#download_data");
let downloadOption = document.querySelector("#download_option");
let schemaList = document.querySelector("#schema_list");
let dataLoading = document.querySelector("#data_loading");

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  tabId = tabs[0].id;
});

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender) {
  let text = message.text;
  switch (text) {
    case "send_table_data_to_download_page":
      senderId = message.senderId;
      schemaList.innerHTML += `<p class="text-center badge-warning">Website 👉 ${message.website_url}</p>`;
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

      if (message.name) {
        var itemName = convertToSlug(message.name);
        downloadData.setAttribute("data-key", itemName);
        if (storeDownloadDate[itemName]) {
          storeDownloadDate[itemName] = [
            ...storeDownloadDate[itemName],
            ...message.tableItem
          ];
        } else {
          storeDownloadDate[itemName] = [...message.tableItem];
        }
      }
      break;
    case "new_download_data":
      setTimeout(() => {
        dataLoading.style.display = "none";
        downloadHelper.CreateTable(resultTable, message.tableItem);
      }, 1000);

      if (message.name) {
        var itemName = convertToSlug(message.name);
        if (storeDownloadDate[itemName]) {
          storeDownloadDate[itemName] = [
            ...storeDownloadDate[itemName],
            ...message.tableItem
          ];
        } else {
          storeDownloadDate[itemName] = [...message.tableItem];
        }
      }

      break;
  }
}

downloadData.addEventListener("click", () => {
  if (!senderId) {
    window.close();
    return;
  }
  let type = downloadOption.options[downloadOption.selectedIndex].value;
  let key = downloadData.dataset.key;
  downloadHelper.CreateShadowTable(downloadTable, storeDownloadDate[key]);
  downloadHelper.Download(type);
  setTimeout(() => {
    downloadTable.innerHTML = "";
  }, 2000);
});

let runScript = () => {
  let run = document.querySelectorAll(".run");
  run.forEach(el =>
    el.addEventListener("click", e => {
      resultTable.innerHTML = "";
      dataLoading.style.display = "block";
      var obj = {
        text: "run_script_for_download",
        senderId: tabId,
        ...storeValue[e.target.dataset.key]
      };
      chrome.tabs.sendMessage(senderId, obj);
      downloadData.setAttribute("data-key", e.target.dataset.key);
    })
  );
};

let convertToSlug = Text => {
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "_");
};
