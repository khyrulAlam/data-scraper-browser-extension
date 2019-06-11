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
        console.log(message.tabId, "old", tabId);
      } else {
        tabId = message.tabId;
      }
      break;
    case "data_table_from_popup":
      // console.log(message, sender);
      chrome.tabs.create({ url: "client/download.html" }, function(tab) {
        console.log(tab);
        setTimeout(() => {
          console.log(" ok send 🐄 ", tab.id, tabId);
          chrome.tabs.sendMessage(tab.id, {
            text: "create_data_table",
            senderId: sender.tab.id,
            ...message.tableItem
          });
        }, 5000);
      });
      break;
  }
});
