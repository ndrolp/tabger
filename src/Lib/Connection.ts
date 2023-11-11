import browser from 'webextension-polyfill'
/**
 * This class manage the connection
 * between the service worker
 * and the content script
 */
class TabgerConnection {
    /**
     * This functions send a message to the service worker
     * and returns a list of the current tabs
     *
     * @static
     * @async
     * @returns {Promise<browser.Tabs.Tab[]>} A list of the active tabs
     */
    static async fetchTabsFromWorker(): Promise<browser.Tabs.Tab[]> {
        return browser.runtime.sendMessage({ query: 'tabs' })
    }

    /**
     * This function list all the tabs for the
     * current window on the service worker
     *
     * @static
     * @async
     * @returns {Promise<browser.Tabs.Tab[]>} A list with the tabs
     */
    static async listActiveTabs(): Promise<browser.Tabs.Tab[]> {
        return await browser.tabs.query({ currentWindow: true })
    }
}

export default TabgerConnection
