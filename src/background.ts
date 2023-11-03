import browser from "webextension-polyfill";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log({ request });
  if (request.query === "focus") {
    console.log(request.tab);
    browser.tabs.highlight({ tabs: request.tab });
    sendResponse();
  }
  if (request.query === "hello") {
    browser.tabs.query({}).then((instances) => {
      console.log(instances);
      sendResponse(instances);
    });
    return true;
  }

  return true;
});
