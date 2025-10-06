import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true
  });

  const page = await browser.newPage();

  // Store all network requests
  const requests = [];
  const responses = [];

  // Monitor all requests
  page.on('request', request => {
    requests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      headers: request.headers()
    });
  });

  // Monitor all responses
  page.on('response', async response => {
    const url = response.url();
    const status = response.status();
    const contentType = response.headers()['content-type'] || '';

    // Log all XHR and fetch requests
    if (response.request().resourceType() === 'xhr' ||
        response.request().resourceType() === 'fetch' ||
        contentType.includes('json') ||
        url.includes('api') ||
        url.includes('kurs') ||
        url.includes('exchange') ||
        url.includes('rate')) {

      try {
        const responseData = await response.text();
        responses.push({
          url,
          status,
          contentType,
          resourceType: response.request().resourceType(),
          data: responseData
        });

        console.log('\n=== POTENTIAL API ENDPOINT FOUND ===');
        console.log('URL:', url);
        console.log('Status:', status);
        console.log('Content-Type:', contentType);
        console.log('Resource Type:', response.request().resourceType());
        console.log('Response Preview:', responseData.substring(0, 500));
        console.log('=====================================\n');
      } catch (e) {
        console.log('Could not read response body for:', url);
      }
    }
  });

  console.log('Navigating to NLB Komercijalna Banka exchange rates page...');

  // Navigate to the page
  await page.goto('https://www.nlbkb.rs/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  // Wait a bit more to catch any delayed requests
  await page.waitForTimeout(5000);

  console.log('\n\n=== ANALYZING PAGE CONTENT ===');

  // Try to find the exchange rate table
  const tableData = await page.evaluate(() => {
    const results = {
      tables: [],
      possibleSelectors: [],
      rawHTML: ''
    };

    // Look for tables
    const tables = document.querySelectorAll('table');
    tables.forEach((table, index) => {
      const rows = [];
      const tableRows = table.querySelectorAll('tr');
      tableRows.forEach(tr => {
        const cells = [];
        tr.querySelectorAll('td, th').forEach(cell => {
          cells.push(cell.textContent.trim());
        });
        if (cells.length > 0) rows.push(cells);
      });
      if (rows.length > 0) {
        results.tables.push({
          index,
          selector: `table:nth-of-type(${index + 1})`,
          rows
        });
      }
    });

    // Look for elements containing EUR or USD
    const searchTerms = ['EUR', 'USD', '114.3593', '95.0444', 'Kupovni', 'Srednji', 'Prodajni'];
    searchTerms.forEach(term => {
      const xpath = `//*[contains(text(), '${term}')]`;
      const elements = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      for (let i = 0; i < elements.snapshotLength; i++) {
        const el = elements.snapshotItem(i);
        results.possibleSelectors.push({
          term,
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          text: el.textContent.trim().substring(0, 100)
        });
      }
    });

    // Get body HTML (limited)
    results.rawHTML = document.body.innerHTML.substring(0, 5000);

    return results;
  });

  console.log('\n=== TABLE DATA FOUND ===');
  console.log(JSON.stringify(tableData.tables, null, 2));

  console.log('\n=== POSSIBLE SELECTORS ===');
  console.log(JSON.stringify(tableData.possibleSelectors, null, 2));

  // Look for specific exchange rate data
  console.log('\n=== LOOKING FOR EXCHANGE RATE DATA ===');
  const exchangeData = await page.evaluate(() => {
    const data = {};

    // Try to find EUR and USD rates
    const allText = document.body.innerText;
    const lines = allText.split('\n');

    lines.forEach((line, index) => {
      if (line.includes('EUR') || line.includes('USD')) {
        data[`line_${index}`] = line.trim();
      }
    });

    return data;
  });

  console.log(JSON.stringify(exchangeData, null, 2));

  // Save all findings to a file
  fs.writeFileSync('/Users/andrejandrasik/kursna-lista/nlb_findings.json', JSON.stringify({
    requests: requests.filter(r =>
      r.resourceType === 'xhr' ||
      r.resourceType === 'fetch' ||
      r.url.includes('api') ||
      r.url.includes('kurs')
    ),
    responses,
    tableData,
    exchangeData
  }, null, 2));

  console.log('\n=== FINDINGS SAVED TO nlb_findings.json ===');
  console.log('Total requests monitored:', requests.length);
  console.log('Potential API responses found:', responses.length);

  // Keep browser open for manual inspection
  console.log('\nBrowser will remain open for 30 seconds for manual inspection...');
  await page.waitForTimeout(30000);

  await browser.close();
})();
