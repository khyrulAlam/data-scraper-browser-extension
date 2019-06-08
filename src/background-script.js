console.log("background script 💒 ");
let tabId;

chrome.runtime.onMessage.addListener(function(message, callback) {
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
  }
});
