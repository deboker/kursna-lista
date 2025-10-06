const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

exports.handler = async function(event, context) {
  let browser = null;

  try {
    // Launch browser with Chromium for Netlify
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Navigate to NLB exchange rates page
    await page.goto('https://www.nlbkb.rs/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for the exchange rate table to load
    await page.waitForSelector('.js-exchange-table-table tbody tr', { timeout: 10000 });

    // Extract exchange rate data
    const exchangeRates = await page.evaluate(() => {
      const rows = document.querySelectorAll('.js-exchange-table-table tbody tr');
      const rates = [];

      // Get date if available
      const dateElement = document.querySelector('.js-exchange-table-valid-from');
      let date = new Date().toISOString().split('T')[0];

      if (dateElement && dateElement.textContent) {
        const dateText = dateElement.textContent.trim();
        const dateMatch = dateText.match(/(\d{2})\.(\d{2})\.(\d{4})/);
        if (dateMatch) {
          date = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
        }
      }

      rows.forEach(row => {
        const cells = row.querySelectorAll('td');

        if (cells.length >= 6) {
          const currency = cells[0].textContent.trim();
          const buyingRate = cells[2].textContent.trim().replace(',', '.');
          const middleRate = cells[3].textContent.trim().replace(',', '.');
          const sellingRate = cells[4].textContent.trim().replace(',', '.');

          // Only add valid currencies with non-zero rates
          if (currency &&
              buyingRate &&
              sellingRate &&
              parseFloat(buyingRate) > 0 &&
              parseFloat(sellingRate) > 0) {
            rates.push({
              bank: "NLB Komercijalna Banka",
              currency: currency,
              buyingRate: parseFloat(buyingRate).toFixed(4),
              sellingRate: parseFloat(sellingRate).toFixed(4),
              date: date
            });
          }
        }
      });

      return rates;
    });

    await browser.close();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(exchangeRates)
    };

  } catch (error) {
    console.error("Error fetching NLB Komercijalna Banka rates:", error.message);

    if (browser) {
      await browser.close();
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
