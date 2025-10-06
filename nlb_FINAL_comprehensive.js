import axios from 'axios';

// Based on analysis of the JavaScript code, the endpoint pattern is:
// servicePath + ".exchangerates." + date + ".json"
// But there might be additional parameters or servlet paths

async function comprehensiveTest() {
  const baseUrl = 'https://www.nlbkb.rs';

  // Get today's date in YYYYMMDD format
  const today = new Date();
  const dateStr = today.toISOString().slice(0,10).replace(/-/g, '');

  console.log(`Testing with date: ${dateStr}\n`);

  // Pattern 1: Try the component endpoint with different selector combinations
  const servicePath = '/content/nlbbanks/nlbkb/sr/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista/jcr:content/root/container/exchangetablekb';

  const selectorPatterns = [
    `.exchangerates.kb.${dateStr}.json`,
    `.kb.exchangerates.${dateStr}.json`,
    `.rates.kb.${dateStr}.json`,
    `/exchangerates.${dateStr}.json`,
    `/rates.${dateStr}.json`,
  ];

  for (const pattern of selectorPatterns) {
    const endpoint = baseUrl + servicePath + pattern;
    try {
      console.log(`Trying: ${endpoint}`);
      const resp = await axios.get(endpoint, {
        headers: { 'Referer': 'https://www.nlbkb.rs/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista' },
        timeout: 5000
      });

      if (resp.data.currencies || JSON.stringify(resp.data).includes('purchasePrice')) {
        console.log(`\n✓ SUCCESS!\n`);
        console.log(JSON.stringify(resp.data, null, 2).substring(0, 2000));
        return;
      }
    } catch (e) {
      // Continue
    }
  }

  // Pattern 2: Try servlet endpoints
  const servletPaths = [
    `/bin/nlbbanks/kb/exchangerates`,
    `/bin/nlb/kb/exchangerates`,
    `/bin/nlbkb/exchangerates`,
    `/content/nlbbanks/nlbkb/exchangerates`,
  ];

  for (const path of servletPaths) {
    const params = [
      `?date=${dateStr}`,
      `?date=${dateStr}&bank=kb`,
      `.${dateStr}.json`,
      `/kb/${dateStr}.json`,
    ];

    for (const param of params) {
      const endpoint = baseUrl + path + param;
      try {
        console.log(`Trying: ${endpoint}`);
        const resp = await axios.get(endpoint, { timeout: 5000 });

        if (resp.data.currencies || JSON.stringify(resp.data).includes('purchasePrice')) {
          console.log(`\n✓ SUCCESS!\n`);
          console.log(JSON.stringify(resp.data, null, 2).substring(0, 2000));
          return;
        }
      } catch (e) {
        // Continue
      }
    }
  }

  console.log('\n❌ Could not find working endpoint with these patterns.');
  console.log('\nThe data might be:');
  console.log('1. Loaded from an external service/API');
  console.log('2. Embedded in the HTML (rendered server-side)');
  console.log('3. Protected behind authentication/tokens');
  console.log('\nWill now extract data from rendered HTML instead...\n');
}

comprehensiveTest();
