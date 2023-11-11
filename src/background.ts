import browser from 'webextension-polyfill'
import TabgerConnection from './Lib/Connection'

browser.runtime.onMessage.addListener((request, _, sendResponse) => {
    // NOTE: This focus a tab
    if (request.query === 'focus') {
        console.log(request.tab)
        browser.tabs.highlight({ tabs: request.tab })
        sendResponse()
    }
    // NOTE: This fetches all the tabs for the content script
    if (request.query === 'tabs') {
        TabgerConnection.listActiveTabs().then(tabs => sendResponse(tabs))
        return true
    }

    return true
})
