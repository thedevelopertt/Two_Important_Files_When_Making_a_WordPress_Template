const {getWebSockDebuggerUrl, initializePuppeteer, connectLocalPuppeteer} = require("../../gulpfile")
const _puppeteer = require("puppeteer")

test("Test WebSocket Debugger Url", async () => {
    const _instance = await initializePuppeteer();
    const url = await getWebSockDebuggerUrl();
    expect(url.length).toBeGreaterThan(1);
    console.log(url)
    _instance.close()
})

test('Connects to Local Puppeteer', async () => {
    const _instance = await initializePuppeteer();
    const _browser = await connectLocalPuppeteer();

    expect(_browser).toBeDefined();
    await _browser.close();
    await _instance.close();
})