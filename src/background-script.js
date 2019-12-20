console.log("background script 💒 ");
let tabId;

chrome.runtime.onMessage.addListener(function(message, sender, callback) {
  let text = message.text;
  switch (text) {
    case "create_iframe":
      if (tabId) {
        if (tabId !== message.tabId) {
          chrome.tabs.sendMessage(tabId, { text: "remove_iframe" });
          tabId = message.tabId;
        }
      } else {
        tabId = message.tabId;
      }
      break;
    case "create_download_tab":
      chrome.tabs.create({ url: "client/download.html" }, function(tab) {
        setTimeout(() => {
          chrome.tabs.sendMessage(tab.id, {
            text: "send_table_data_to_download_page",
            senderId: sender.tab.id,
            website_url: message.website_url,
            name: message.name,
            tableItem: [...message.tableItem]
          });
        }, 3000);
      });
      break;
    case "new_data_send_to_download_page":
      chrome.tabs.sendMessage(message.reciverId, {
        text: "new_download_data",
        name: message.name,
        tableItem: [...message.tableItem]
      });
      break;
  }
});
