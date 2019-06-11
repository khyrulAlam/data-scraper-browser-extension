console.log(" 🍌 ");
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  console.log(tabs);
});

let senderId = "";

chrome.runtime.onMessage.addListener(function(message, sender) {
  console.log(message, sender);
  senderId = message.senderId;
});

document.querySelector("#send").addEventListener("click", function() {
  if (!senderId) {
    window.close();
  }
  chrome.tabs.sendMessage(senderId, { text: "message from other page" });
});
