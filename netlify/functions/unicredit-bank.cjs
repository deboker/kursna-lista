const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

exports.handler = async function(event, context) {
  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Navigate to UniCredit Bank exchange rates page
    await page.goto("https://www.unicreditbank.rs/rs/pi/kursna-lista.html", {
      waitUntil: "networkidle0",
      timeout: 8000
    });

    // Wait for the currency table to be populated
    await page.waitForSelector("#currency_list_table tr", { timeout: 5000 });

    // Extract exchange rates
    const exchangeRates = await page.evaluate(() => {
      const rows = document.querySelectorAll("#currency_list_table tr");
      const rates = [];

      // Get date from page
      const dateText = document.body.innerText;
      const dateMatch = dateText.match(/(\d{2}\.\d{2}\.\d{4})/);
      const date = dateMatch ? dateMatch[1].split('.').reverse().join('-') : new Date().toISOString().split('T')[0];

      rows.forEach(row => {
        const cells = row.querySelectorAll("td");

        if (cells.length >= 6) {
          const currency = cells[0]?.innerText.trim();
          const buyingRateText = cells[4]?.innerText.trim().replace(',', '.');
          const sellingRateText = cells[5]?.innerText.trim().replace(',', '.');

          const buyingRate = buyingRateText ? parseFloat(buyingRateText) : 0;
          const sellingRate = sellingRateText ? parseFloat(sellingRateText) : 0;

          if (currency && buyingRate > 0 && sellingRate > 0) {
            rates.push({
              bank: "UniCredit Bank",
              currency: currency,
              buyingRate: buyingRate.toFixed(4),
              sellingRate: sellingRate.toFixed(4),
              date: date
            });
          }
        }
      });

      return { rates, date };
    });

    await browser.close();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(exchangeRates.rates)
    };
  } catch (error) {
    console.error("Error fetching UniCredit Bank rates:", error.message);

    if (browser) {
      await browser.close();
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
