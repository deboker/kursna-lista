import axios from 'axios';
import fs from 'fs';

async function testEndpoint() {
  const baseUrl = 'https://www.nlbkb.rs';
  const servicePath = '/content/nlbbanks/nlbkb/sr/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista/jcr:content/root/container/exchangetablekb';

  const endpoints = [
    servicePath,
    servicePath + '.json',
    servicePath + '.html',
    servicePath + '/exchange.json',
    servicePath + '/rates.json',
    servicePath + '.model.json',
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`\n=== Trying: ${baseUrl}${endpoint} ===`);
      const response = await axios.get(baseUrl + endpoint, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'application/json, text/html, */*',
          'Referer': 'https://www.nlbkb.rs/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista'
        },
        timeout: 10000
      });

      console.log(`SUCCESS!`);
      console.log(`Status: ${response.status}`);
      console.log(`Content-Type: ${response.headers['content-type']}`);
      console.log(`Response length: ${JSON.stringify(response.data).length}`);
      console.log(`Response preview:`, JSON.stringify(response.data).substring(0, 1000));

      // Save successful response
      const filename = endpoint.replace(/\//g, '_').replace(/:/g, '-');
      fs.writeFileSync(
        `/Users/andrejandrasik/kursna-lista/nlb_endpoint_${filename}.json`,
        JSON.stringify(response.data, null, 2)
      );
      console.log(`Saved to nlb_endpoint_${filename}.json`);

      // Check if response contains EUR or USD
      const dataStr = JSON.stringify(response.data);
      if (dataStr.includes('EUR') || dataStr.includes('USD') || dataStr.includes('114') || dataStr.includes('95')) {
        console.log('\n*** THIS ENDPOINT CONTAINS EXCHANGE RATE DATA! ***');
      }

    } catch (error) {
      if (error.response) {
        console.log(`Failed with status: ${error.response.status}`);
      } else {
        console.log(`Failed: ${error.message}`);
      }
    }
  }

  // Also try variations based on AEM structure
  console.log('\n\n=== Trying AEM selector patterns ===');

  const selectors = [
    '.exchangerates',
    '.rates',
    '.data',
    '.export',
    '.model',
  ];

  const basePath = '/content/nlbbanks/nlbkb/sr/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista';

  for (const selector of selectors) {
    try {
      const endpoint = basePath + selector + '.json';
      console.log(`\nTrying: ${baseUrl}${endpoint}`);
      const response = await axios.get(baseUrl + endpoint, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'application/json',
          'Referer': 'https://www.nlbkb.rs/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista'
        },
        timeout: 10000
      });

      console.log(`SUCCESS! Status: ${response.status}`);
      console.log(`Response preview:`, JSON.stringify(response.data).substring(0, 500));

      const dataStr = JSON.stringify(response.data);
      if (dataStr.includes('EUR') || dataStr.includes('USD')) {
        console.log('\n*** THIS ENDPOINT CONTAINS EXCHANGE RATE DATA! ***');
        fs.writeFileSync(
          `/Users/andrejandrasik/kursna-lista/nlb_working_endpoint.json`,
          JSON.stringify({ endpoint: baseUrl + endpoint, data: response.data }, null, 2)
        );
      }

    } catch (error) {
      if (error.response) {
        console.log(`Failed with status: ${error.response.status}`);
      }
    }
  }
}

testEndpoint();
