import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener((request, _, sendResponse) => {
  // NOTE: This focus a tab
  if (request.query === "focus") {
    console.log(request.tab);
    browser.tabs.highlight({ tabs: request.tab });
    sendResponse();
  }
  // NOTE: This fetches all the tabs for the content script
  if (request.query === "tabs") {
    browser.tabs.query({ currentWindow: true }).then((instances) => {
      console.log(instances);
      // @ts-expect-error function no inclure parameters
      sendResponse(instances);
    });
    return true;
  }

  return true;
});
