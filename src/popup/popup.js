import "./main.css";
import { tabParams, storeValue } from "../utils/globalVar";
import { StoreData, RunTimeSendMsg } from "../utils/module";
let runTimeSendMsg = new RunTimeSendMsg();
//element selector
let newSchema = "";
let homePage = "";
var console = chrome.extension.getBackgroundPage().console;
let _signup = document.querySelector("#signup");
let _appWrapper = document.querySelector("#app-wrapper");

// const makeSignupDom = ()=>{

// }

let appWrapperDom = () => {
  _appWrapper.innerHTML = `
  <header id="header">
      <h1>Data Scraper 🕷</h1>
      <div class="header-opt">
          <button id="newSchema">New Schema</button>
      </div>
  </header>

  <main id="main">
      <section id="homePage">
      </section>
  </main>

  <footer id="footer">
      &quot;Java is to JavaScript as ham is to hamster." - Jeremy Keith
  </footer>`;
};

let appEventStart = () => {
  newSchema = document.querySelector("#newSchema");
  homePage = document.querySelector("#homePage");
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
};

//runtime check. Is there is any schema on chrome storage
if (!localStorage.getItem("_gId")) {
  console.log("nai");
  // chrome.identity.getAuthToken(function(access_token) {
  //   if (chrome.runtime.lastError) {
  //     console.log(chrome.runtime.lastError);
  //     return;
  //   }
  //   console.log(access_token);
  // });
} else {
  appWrapperDom();
  appEventStart();
  chrome.tabs.query(tabParams, function(tabs) {
    let store = new StoreData(tabs[0].url);
    let key = store.getKey();
    if (key === false) {
      document.body.innerHTML =
        "<h3>Something wrong. your url must be http or https protocol. </h3>";
    } else {
      chrome.storage.sync.get([key], result => {
        if (key in result) {
          let data = result[key];
          Object.keys(data).forEach(key => {
            storeValue[key] = data[key];
            homePage.innerHTML += `
          <div class="article">
              <h3>${data[key].name}</h3>
              <p>${data[key].schema.row.rowName}</p>
              <button class="run" data-key="${key}">run💥</button>
          </div>
          `;
          });
          runScript();
        }
      });
    }
  });
}

let runScript = () => {
  let run = document.querySelectorAll(".run");
  run.forEach(el =>
    el.addEventListener("click", e => {
      var obj = {
        text: "run_script_from_popup",
        ...storeValue[e.target.dataset.key]
      };
      runTimeSendMsg.send(obj);
    })
  );
};
