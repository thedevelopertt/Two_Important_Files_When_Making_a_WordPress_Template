const {getWebSockDebuggerUrl, initializePuppeteer, connectLocalPuppeteer, createIncognitoContext} = require("../../gulpfile")
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

test("Create IncognitoContext with Device Size at Url returns the Page", async () => {
    const _instance = await initializePuppeteer();
    const page = await createIncognitoContext("https://google.com");
    expect(page).toBeDefined();
    await page.close()

    const devicePage = await createIncognitoContext("https://google.com",'iPhone 8')
    expect(devicePage).toBeDefined();
    await devicePage.close();

    const undefinedUrlAndDevice = await createIncognitoContext();
    expect(undefinedUrlAndDevice).toBeDefined();
    await undefinedUrlAndDevice.close();

    await _instance.close();
},10000)