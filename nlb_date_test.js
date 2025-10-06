import axios from 'axios';
import fs from 'fs';

async function testDates() {
  const baseUrl = 'https://www.nlbkb.rs';
  const servicePath = '/content/nlbbanks/nlbkb/sr/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista/jcr:content/root/container/exchangetablekb';

  // Test different date formats
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const dateFormats = [
    `${year}${month}${day}`,  // 20251006
    `${year}-${month}-${day}`, // 2025-10-06
    `${day}.${month}.${year}`, // 06.10.2025
    `${day}${month}${year}`,  // 06102025
    '',  // No date (current/latest)
  ];

  console.log('Testing date formats...\n');

  for (const dateFormat of dateFormats) {
    const endpoint = dateFormat
      ? `${baseUrl}${servicePath}.exchangerates.${dateFormat}.json`
      : `${baseUrl}${servicePath}.exchangerates.json`;

    try {
      console.log(`Trying: ${endpoint}`);
      const response = await axios.get(endpoint, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://www.nlbkb.rs/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista'
        },
        timeout: 5000
      });

      const data = response.data;
      const dataStr = JSON.stringify(data);

      // Check if it has currencies array
      if (data.currencies || dataStr.includes('EUR') || dataStr.includes('USD') || dataStr.includes('purchasePrice')) {
        console.log(`\n*** FOUND IT WITH DATE FORMAT: ${dateFormat || 'no date'} ***\n`);
        console.log(`Status: ${response.status}`);
        console.log(`Data preview:`, JSON.stringify(data, null, 2).substring(0, 2000));

        fs.writeFileSync(
          '/Users/andrejandrasik/kursna-lista/NLB_FINAL_WORKING.json',
          JSON.stringify({
            endpoint,
            dateFormat,
            data
          }, null, 2)
        );

        return;
      } else {
        console.log(`  -> No currency data (metadata only)`);
      }

    } catch (error) {
      if (error.response) {
        console.log(`  -> Failed: ${error.response.status}`);
      } else {
        console.log(`  -> Failed: ${error.message}`);
      }
    }
  }

  // Maybe the data is in a child node
  console.log('\n\nTrying with /currencies suffix...\n');

  for (const dateFormat of dateFormats.slice(0, 2)) {
    const variations = [
      `${servicePath}.exchangerates.${dateFormat}.json/currencies`,
      `${servicePath}/currencies.${dateFormat}.json`,
      `${servicePath}.currencies.${dateFormat}.json`,
    ];

    for (const variation of variations) {
      try {
        const endpoint = `${baseUrl}${variation}`;
        console.log(`Trying: ${endpoint}`);

        const response = await axios.get(endpoint, {
          headers: {
            'User-Agent': 'Mozilla/5.0',
            'Referer': 'https://www.nlbkb.rs/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista'
          },
          timeout: 5000
        });

        if (response.status === 200) {
          console.log(`\n*** SUCCESS! ***`);
          console.log(JSON.stringify(response.data, null, 2).substring(0, 1000));
          return;
        }
      } catch (e) {
        //Silent fail
      }
    }
  }
}

testDates();
