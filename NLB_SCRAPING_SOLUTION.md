# NLB Komercijalna Banka - Exchange Rate Extraction Method

## Finding Summary
After extensive analysis of the website, network requests, and JavaScript code, **NO PUBLIC API ENDPOINT EXISTS** for NLB Komercijalna Banka exchange rates.

The exchange rate data is:
- Loaded dynamically via JavaScript in the browser
- NOT available via static JSON/XML endpoints
- Requires browser automation to extract

## Working Solution: Puppeteer/Playwright Scraping

### URL
```
https://www.nlbkb.rs/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista
```

### Method: Wait for JavaScript to populate the table, then extract

### CSS Selectors:

**Table Container:**
```css
.js-exchange-table-table
```

**Table Rows (each currency):**
```css
.js-exchange-table-table tbody tr
```

**Columns per row:**
1. Currency Flag + Name: `td:nth-child(1)`
2. Valuta: `td:nth-child(2)`
3. Paritet: `td:nth-child(3)`
4. Devize - Kupovni: `td:nth-child(4)`
5. Devize - Srednji: `td:nth-child(5)`
6. Devize - Prodajni: `td:nth-child(6)`
7. Efektiva - Kupovni: `td:nth-child(7)`
8. Efektiva - Prodajni: `td:nth-child(8)`
9. Min iznos: `td:nth-child(9)`
10. Max iznos: `td:nth-child(10)`

**Valid From Date:**
```css
.js-exchange-table-valid-from
```

### Sample Puppeteer Code:

```javascript
const puppeteer = require('puppeteer');

async function scrapeNLBRates() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.nlbkb.rs/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  // Wait for the table to be populated by JavaScript
  await page.waitForSelector('.js-exchange-table-table tbody tr', { timeout: 30000 });

  // Additional wait to ensure all data is loaded
  await page.waitForTimeout(2000);

  const rates = await page.evaluate(() => {
    const rows = document.querySelectorAll('.js-exchange-table-table tbody tr');
    const results = [];

    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 6) {
        results.push({
          currency: cells[1]?.textContent.trim() || '',
          paritet: cells[2]?.textContent.trim() || '',
          kupovni: cells[3]?.textContent.trim() || '',
          srednji: cells[4]?.textContent.trim() || '',
          prodajni: cells[5]?.textContent.trim() || '',
          efektivaKupovni: cells[6]?.textContent.trim() || '',
          efektivaProdajni: cells[7]?.textContent.trim() || '',
        });
      }
    });

    return results;
  });

  const validFrom = await page.evaluate(() => {
    return document.querySelector('.js-exchange-table-valid-from')?.textContent.trim() || '';
  });

  await browser.close();

  return {
    validFrom,
    rates
  };
}

// Usage
scrapeNLBRates().then(data => {
  console.log(JSON.stringify(data, null, 2));
});
```

### Alternative: Playwright

```javascript
const { chromium } = require('playwright');

async function scrapeNLBRates() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.nlbkb.rs/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista');

  // Wait for table to be populated
  await page.waitForSelector('.js-exchange-table-table tbody tr');
  await page.waitForTimeout(2000);

  const rates = await page.$$eval('.js-exchange-table-table tbody tr', rows => {
    return rows.map(row => {
      const cells = row.querySelectorAll('td');
      return {
        currency: cells[1]?.textContent.trim(),
        paritet: cells[2]?.textContent.trim(),
        kupovni: cells[3]?.textContent.trim(),
        srednji: cells[4]?.textContent.trim(),
        prodajni: cells[5]?.textContent.trim(),
        efektivaKupovni: cells[6]?.textContent.trim(),
        efektivaProdajni: cells[7]?.textContent.trim(),
      };
    });
  });

  await browser.close();
  return rates;
}
```

### Expected Output Format:

```json
{
  "validFrom": "Važi od: 04.10.2025.",
  "rates": [
    {
      "currency": "EUR",
      "paritet": "1",
      "kupovni": "114.3593",
      "srednji": "117.1714",
      "prodajni": "119.9835",
      "efektivaKupovni": "113.8093",
      "efektivaProdajni": "120.5335"
    },
    {
      "currency": "USD",
      "paritet": "1",
      "kupovni": "95.0444",
      "srednji": "99.9415",
      "prodajni": "104.8386",
      "efektivaKupovni": "94.5444",
      "efektivaProdajni": "105.3386"
    }
  ]
}
```

## Why No API Exists

1. **AEM (Adobe Experience Manager) Architecture**: The site uses AEM CMS which renders components dynamically
2. **Component-based rendering**: Exchange rates are loaded via JavaScript after page load
3. **No public servlet**: Tested all common AEM servlet patterns - none return currency data
4. **Internal service**: The data likely comes from an internal/protected service not exposed publicly

## Attempted Endpoints (All Failed)

- `/content/.../exchangetablekb.json` - Metadata only
- `/content/.../exchangetablekb.exchangerates.{date}.json` - Metadata only
- `/bin/nlbbanks/exchangerates` - 404
- `/bin/nlb/kb/exchangerates` - 404
- Various other AEM selector combinations - All failed

## Conclusion

**Use browser automation (Puppeteer/Playwright) to scrape the rendered page.**
There is no direct API endpoint available for NLB Komercijalna Banka exchange rates.
