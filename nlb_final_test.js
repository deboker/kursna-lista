import axios from 'axios';
import fs from 'fs';

async function testAllEndpoints() {
  const baseUrl = 'https://www.nlbkb.rs';
  const servicePath = '/content/nlbbanks/nlbkb/sr/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista/jcr:content/root/container/exchangetablekb';

  // Based on the JS code pattern: servicePath + ".something.json"
  const selectors = [
    '.json',
    '.exchangerates.json',
    '.exchangerates.kb.json',
    '.rates.json',
    '.data.json',
    '.export.json',
    '.xml',
  ];

  // Add date-based variations (today's date)
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  selectors.push(`.${dateStr}.json`);
  selectors.push(`.exchangerates.${dateStr}.json`);
  selectors.push(`.rates.${dateStr}.json`);

  console.log(`Testing with date: ${dateStr}`);

  for (const selector of selectors) {
    try {
      const endpoint = baseUrl + servicePath + selector;
      console.log(`\nTrying: ${endpoint}`);

      const response = await axios.get(endpoint, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'application/json, application/xml, */*',
          'Referer': 'https://www.nlbkb.rs/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista'
        },
        timeout: 10000
      });

      console.log(`SUCCESS! Status: ${response.status}`);
      console.log(`Content-Type: ${response.headers['content-type']}`);

      const dataStr = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
      console.log(`Response length: ${dataStr.length}`);
      console.log(`Response preview: ${dataStr.substring(0, 500)}`);

      if (dataStr.includes('EUR') || dataStr.includes('USD') || dataStr.includes('114') || dataStr.includes('95')) {
        console.log('\n*** FOUND IT! THIS ENDPOINT CONTAINS EXCHANGE RATE DATA! ***\n');

        fs.writeFileSync(
          '/Users/andrejandrasik/kursna-lista/NLB_WORKING_ENDPOINT.json',
          JSON.stringify({
            endpoint: endpoint,
            selector: selector,
            date: dateStr,
            data: response.data
          }, null, 2)
        );

        console.log('Saved to NLB_WORKING_ENDPOINT.json');
        return;
      }

    } catch (error) {
      if (error.response) {
        console.log(`Failed with status: ${error.response.status}`);
      } else if (error.code === 'ECONNABORTED') {
        console.log(`Timeout`);
      } else {
        console.log(`Failed: ${error.message}`);
      }
    }
  }

  console.log('\n\nNo working endpoint found. Trying alternate base paths...\n');

  // Try without the full path
  const alternatePaths = [
    '/content/nlbbanks/nlbkb/sr/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista',
    '/bin/nlbbanks/exchange',
    '/bin/nlb/exchangerates',
  ];

  for (const path of alternatePaths) {
    for (const selector of ['.json', '.exchangerates.json', `.exchangerates.${dateStr}.json`]) {
      try {
        const endpoint = baseUrl + path + selector;
        console.log(`Trying: ${endpoint}`);

        const response = await axios.get(endpoint, {
          headers: {
            'User-Agent': 'Mozilla/5.0',
            'Accept': 'application/json'
          },
          timeout: 5000
        });

        const dataStr = JSON.stringify(response.data);
        if (dataStr.includes('EUR') || dataStr.includes('USD')) {
          console.log(`\n*** FOUND IT! ${endpoint} ***\n`);
          console.log(JSON.stringify(response.data, null, 2).substring(0, 1000));
          return;
        }
      } catch (e) {
        // Silent fail
      }
    }
  }
}

testAllEndpoints();
