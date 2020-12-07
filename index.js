const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });
let currentprice = 0;

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming() {
    ws.send(currentprice);
  });
});



(async function main() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
  await driver.get('http://preev.com/btc/eur');
  setInterval(async () => {
    currentprice = await driver.findElement(By.id("numField")).getAttribute("value");
  }, 5000);

})();

