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

const makeSignupDom = () => {
  _signup.innerHTML = `<div class="signup-wrapper">
  <button>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48"
          class="abcRioButtonSvg">
          <g>
              <path fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
              </path>
              <path fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
              </path>
              <path fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
              </path>
              <path fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
              </path>
              <path fill="none" d="M0 0h48v48H0z"></path>
          </g>
      </svg>
      Sign in with Google
  </button>
</div>`;
};

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
  makeSignupDom();
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
