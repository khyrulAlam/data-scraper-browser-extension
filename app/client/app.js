!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t,n){var r=n(1);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(3)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(2)(!1)).push([e.i,"body {\r\n  margin: 0 auto;\r\n  background: #e6e6e1;\r\n  overflow: scroll;\r\n}\r\n\r\n.nav-tabs {\r\n  background: #d8d085;\r\n  padding-bottom: 1px;\r\n}\r\n.tab-content {\r\n  background: #fff;\r\n  padding: 10px 15px;\r\n  box-shadow: 0 3px 12px 0px #33333326;\r\n}\r\n.nav-tabs .nav-link {\r\n  color: #ffffff;\r\n}\r\nhr {\r\n  border-top: 1px dashed rgb(0, 0, 0);\r\n}\r\n",""])},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),s=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(s).concat([o]).join("\n")}var a;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var s=this[o][0];null!=s&&(r[s]=!0)}for(o=0;o<e.length;o++){var a=e[o];null!=a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){var r,o,s={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),i=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var r=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}}(),c=null,l=0,u=[],d=n(4);function m(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=s[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(b(r.parts[a],t))}else{var i=[];for(a=0;a<r.parts.length;a++)i.push(b(r.parts[a],t));s[r.id]={id:r.id,refs:1,parts:i}}}}function f(e,t){for(var n=[],r={},o=0;o<e.length;o++){var s=e[o],a=t.base?s[0]+t.base:s[0],i={css:s[1],media:s[2],sourceMap:s[3]};r[a]?r[a].parts.push(i):n.push(r[a]={id:a,parts:[i]})}return n}function p(e,t){var n=i(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=u[u.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),u.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=i(e.insertAt.before,n);n.insertBefore(t,o)}}function h(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=u.indexOf(e);t>=0&&u.splice(t,1)}function v(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var r=function(){0;return n.nc}();r&&(e.attrs.nonce=r)}return y(t,e.attrs),p(e,t),t}function y(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function b(e,t){var n,r,o,s;if(t.transform&&e.css){if(!(s="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=s}if(t.singleton){var a=l++;n=c||(c=v(t)),r=w.bind(null,n,a,!1),o=w.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",y(t,e.attrs),p(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,s=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||s)&&(r=d(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(a),i&&URL.revokeObjectURL(i)}.bind(null,n,t),o=function(){h(n),n.href&&URL.revokeObjectURL(n.href)}):(n=v(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){h(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=f(e,t);return m(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var a=n[o];(i=s[a.id]).refs--,r.push(i)}e&&m(f(e,t),t);for(o=0;o<r.length;o++){var i;if(0===(i=r[o]).refs){for(var c=0;c<i.parts.length;c++)i.parts[c]();delete s[i.id]}}}};var g,x=(g=[],function(e,t){return g[e]=t,g.filter(Boolean).join("\n")});function w(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=x(t,o);else{var s=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(s,a[t]):e.appendChild(s)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,s=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(s)?e:(o=0===s.indexOf("//")?s:0===s.indexOf("/")?n+s:r+s.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(e,t,n){"use strict";n.r(t);n(0);const r=chrome.runtime.id,o={name:"",schema:{row:null,columns:[]}};class s{constructor(){this.elId="foxex-root-container",this.iframeId="iframe-container"}createIframe(e){let t=document.createElement("div");t.id=this.elId,t.style.position="fixed",t.style["z-index"]=2147483647,t.style.top=0,t.style.right=0,t.style.width="315px",t.style.height="100vh";let n=document.createElement("div");n.id="controlArrow",n.style.position="absolute",n.style.background="#0073ca",n.style.cursor="pointer",n.style.width="30px",n.style.height="30px",n.style.left="-30px",n.style.color="#fff",n.style.display="flex",n.style["align-items"]="center",n.style["justify-content"]="center",n.innerHTML="👈",t.append(n),setTimeout(()=>{document.querySelector("#controlArrow").addEventListener("click",e=>{"315px"===t.style.width?(n.innerHTML="👉",t.style.width="60vw"):(n.innerHTML="👈",t.style.width="315px")})},1e3);let o=document.createElement("iframe");o.allow="autoplay",o.id=this.iframeId,o.style.display="block",o.style.height="100vh",o.style.width="100%",o.style.border="none",o.style["box-shadow"]="4px 0px 16px 4px #0000001a",t.append(o),document.getElementsByTagName("body")[0].append(t),o.setAttribute("src",`chrome-extension://${r}/client/index.html?id=${e}`)}removeIframe(){let e=document.getElementById(this.elId);e&&e.parentNode.removeChild(e)}}class a{constructor(){this.tabParams={active:!0,currentWindow:!0}}send(e){chrome.tabs.query(this.tabParams,function(t){chrome.tabs.sendMessage(t[0].id,e)})}}class i extends a{constructor(e,t){super(),this.element=e,this.lists=t,this.element.innerHTML=""}makeCheckBox(){if(this.lists.attributes&&0===this.lists.attributes.length){let e={name:this.lists.element,isElement:!0};this.element.innerHTML+=`<div class="form-check">\n      <input class="form-check-input" type="radio" name="cls" value="${encodeURIComponent(JSON.stringify(e))}">\n      <label class="form-check-label">\n        ${this.lists.element}\n      </label>\n    </div>`,this.element.innerHTML+='<button type="button" class="btn btn-warning mt-4" id="doneSelect">Done</button>'}else this.lists.attributes.forEach(e=>{let t={name:e,isElement:!1};this.element.innerHTML+=`<div class="form-check">\n        <input class="form-check-input" type="radio" name="cls" value="${encodeURIComponent(JSON.stringify(t))}">\n        <label class="form-check-label">\n          ${e}\n        </label>\n      </div>`}),this.element.innerHTML+='<button type="button" class="btn btn-warning mt-4" id="doneSelect">Done</button>'}selectClass(){this.element.addEventListener("change",e=>{let t=document.querySelector("input[name=cls]:checked").value,n=document.querySelector("input[name=rowCls]"),r=JSON.parse(decodeURIComponent(t));r.isElement?n.value=r.name:n.value="."+r.name;let o={text:"mark_element",clsName:r};this.send(o)}),document.querySelector("#doneSelect").addEventListener("click",function(e){let t=document.querySelector("input[name=rowName]").value?document.querySelector("input[name=rowName]").value:"row",n=document.querySelector("input[name=rowCls]").value;o.schema.row={rowName:t,rowCls:n},e.target.parentElement.innerHTML=""})}selectClassForCol(e){this.element.addEventListener("change",t=>{let n=this.element.querySelector("input[name=cls]:checked").value,r=e.querySelector("input[name=colCls]"),o=JSON.parse(decodeURIComponent(n));o.isElement?r.value=o.name:r.value="."+o.name;let s={text:"mark_element",clsName:o};this.send(s)}),document.querySelector("#doneSelect").addEventListener("click",function(t){let n=e.querySelector("input[name=colName]").value?e.querySelector("input[name=colName]").value:"colName",r=e.querySelector("input[name=colCls]").value;o.schema.columns.push({colName:n,colCls:r}),t.target.parentElement.innerHTML=""})}}class c{constructor(e){this.urlInfo=new URL(e),this.hostName=this.urlInfo.hostname.replace(/\./g,"_").trim().toString(),this.data=null}getKey(){return!!this.hostName&&this.hostName}saveData(e){chrome.storage.sync.get([this.hostName],function(t){let n=t||{};!this.hostName in n&&(n[this.hostName]={}),Object.keys(n).forEach(t=>{n[t][e.name]=e,chrome.storage.sync.set(n,function(){console.log("save")})})})}}var l=new class{constructor(){this.count=1}addNewColumnField(e){this.count++,e.innerHTML=`<div class="col-12">\n        <input type="text" class="form-control" name="colName" placeholder="Column Name">\n      </div>\n      <div class="col-9">\n          <input type="text" class="form-control" name="colCls" placeholder="Class Name">\n      </div>\n      <div class="col-3">\n          <button type="button" class="btn btn-primary mouseMove-col" data-col="colNum${this.count}">Drag</button>\n      </div>\n      <div class="class-checkbox-dom">\n      </div>\n    </div>`}createTable(e){e.classList.add("table","table-bordered"),e.innerHTML+='<thead id="tbhead"><tr><td>No.</td></tr></thead><tbody id="tbbody"></tbody>'}tableHead(e){Object.keys(e).forEach(e=>{document.querySelector("#tbhead tr").innerHTML+=`<th>${e}</th>`})}tableBody(e){e.map((e,t)=>{let n=document.createElement("tr");n.innerHTML+=`<td>${t+1}</td>`,Object.keys(e).forEach(t=>{n.innerHTML+=`<td>${e[t]}</td>`}),document.querySelector("#tbbody").append(n)})}},u=new a,d={ref:""};function m(e){if(115===e.charCode&&"KeyS"===e.code){var t={text:"stop_mouse_move",ref:d.ref};u.send(t),document.removeEventListener("keypress",m)}}document.querySelector("#schemaName").addEventListener("keyup",function(e){o.name=e.target.value.trim()}),document.querySelector("#startPickMouse").addEventListener("click",function(e){u.send({text:"start_mouse_move"}),d.ref="row_name",document.addEventListener("keypress",m)});var f=document.querySelector("#addAnotherDom");function p(){document.querySelectorAll(".mouseMove-col").forEach(function(e){return e.addEventListener("click",function(e){u.send({text:"start_mouse_move"}),d.ref=e.target.dataset.col,document.addEventListener("keypress",m)})})}document.querySelector("#addMoreCol").addEventListener("click",function(e){var t,n=document.createElement("div");l.addNewColumnField(n);var r=["form-row","mt-2","colNum".concat(l.count)];(t=n.classList).add.apply(t,r),f.appendChild(n),p()}),p(),document.querySelector("#jalalRun").addEventListener("click",function(e){var t={text:"run_script",schema:o.schema};u.send(t)}),chrome.runtime.onMessage.addListener(function(e,t){var n=e.text;if("class_lists"===n)if("row_name"===e.ref){var r=document.querySelector(".checkbox-dom"),o=new i(r,e.lists);o.makeCheckBox(),o.selectClass()}else{var s=document.querySelector(".".concat(e.ref)),a=s.querySelector(".class-checkbox-dom"),c=new i(a,e.lists);c.makeCheckBox(),c.selectClassForCol(s)}if("data_table"===n){console.table(e.tableItem);var u=document.querySelector("#resultTable");u.innerHTML="",u.style["font-size"]="12px";var d=document.createElement("table");l.createTable(d),u.append(d),l.tableHead(e.tableItem[0]),l.tableBody(e.tableItem)}}),document.querySelector("#saveSchema").addEventListener("click",function(){chrome.tabs.getCurrent(function(e){var t=new c(e.url);""!=o.name?(t.saveData(o),(new s).removeIframe()):console.log("schema name is null")})}),document.querySelector("#getData").addEventListener("click",function(){chrome.tabs.getCurrent(function(e){var t=new c(e.url).getKey();chrome.storage.sync.get([t],function(e){console.log(e)})})})}]);