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

    // Navigate to Alta Banka exchange rates page
    await page.goto('https://altabanka.rs/kursna-lista-2/', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for the DataTable to load
    await page.waitForSelector('#table_1 tbody tr', { timeout: 15000 });

    // Extract exchange rate data
    const exchangeRates = await page.evaluate(() => {
      const rows = document.querySelectorAll('#table_1 tbody tr');
      const rates = [];

      // Get today's date
      let date = new Date().toISOString().split('T')[0];

      rows.forEach(row => {
        const cells = row.querySelectorAll('td');

        if (cells.length >= 8) {
          // Extract data from cells
          const dateCell = cells[1]?.textContent.trim();
          const currency = cells[3]?.textContent.trim(); // OZNVAL - Valuta
          const buyingRateText = cells[5]?.textContent.trim(); // IOTKHART - Kupovni za devize
          const sellingRateText = cells[7]?.textContent.trim(); // IPRODHART - Prodajni za devize

          // Parse date if available (format: dd/mm/yyyy)
          if (dateCell && dateCell.match(/\d{2}\/\d{2}\/\d{4}/)) {
            const [day, month, year] = dateCell.split('/');
            date = `${year}-${month}-${day}`;
          }

          // Clean and parse rates (remove spaces, replace comma with dot)
          const buyingRate = buyingRateText ? buyingRateText.replace(/\s/g, '').replace(',', '.') : '0';
          const sellingRate = sellingRateText ? sellingRateText.replace(/\s/g, '').replace(',', '.') : '0';

          // Only add valid currencies with non-zero rates
          if (currency &&
              currency.length === 3 &&
              parseFloat(buyingRate) > 0 &&
              parseFloat(sellingRate) > 0) {
            rates.push({
              bank: "Alta Banka",
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
    console.error("Error fetching Alta Banka rates:", error.message);

    if (browser) {
      await browser.close();
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
