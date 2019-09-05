const {getWebSockDebuggerUrl, initializePuppeteer} = require("../../gulpfile")

test("Test WebSocket Debugger Url", async () => {
    const _instance = await initializePuppeteer();
    const url = await getWebSockDebuggerUrl();
    expect(url.length).toBeGreaterThan(1);
    console.log(url)
    _instance.close()
})