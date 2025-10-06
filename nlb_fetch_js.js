import axios from 'axios';
import fs from 'fs';

async function fetchJavaScriptFiles() {
  const baseUrl = 'https://www.nlbkb.rs';

  const jsFiles = [
    '/etc.clientlibs/nlb/clientlibs/clientlib-site.lc-d8028e906b6ce27e509cf4eec2bdcb88-lc.min.js',
    '/etc.clientlibs/core/wcm/components/commons/site/clientlibs/container.lc-0a6aff292f5cc42142779cde92054524-lc.min.js',
    '/etc.clientlibs/nlb/clientlibs/clientlib-base.lc-2b3737f68356f91132f719e823f7a473-lc.min.js'
  ];

  for (const jsFile of jsFiles) {
    try {
      console.log(`\n=== Fetching ${jsFile} ===`);
      const response = await axios.get(baseUrl + jsFile, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      });

      const content = response.data;

      // Look for API endpoints
      const apiPatterns = [
        /https?:\/\/[^\s'"]+api[^\s'"]*/gi,
        /["']\/[^"']*kurs[^"']*/gi,
        /["']\/[^"']*exchange[^"']*/gi,
        /["']\/[^"']*currency[^"']*/gi,
        /fetch\s*\(\s*["']([^"']+)["']/gi,
        /axios\.[get|post]+\s*\(\s*["']([^"']+)["']/gi,
        /\.get\s*\(\s*["']([^"']+)["']/gi,
      ];

      console.log('\n--- Looking for API endpoints ---');
      let foundEndpoint = false;

      apiPatterns.forEach((pattern, index) => {
        const matches = content.match(pattern);
        if (matches && matches.length > 0) {
          console.log(`Pattern ${index} found ${matches.length} matches:`);
          matches.forEach(match => {
            console.log(`  - ${match}`);
            if (match.includes('kurs') || match.includes('exchange') || match.includes('currency')) {
              foundEndpoint = true;
            }
          });
        }
      });

      // Search for specific keywords
      const keywords = ['exchange-table', 'kursna', 'currency', 'devize', 'efektiva'];
      console.log('\n--- Searching for keywords ---');

      keywords.forEach(keyword => {
        if (content.includes(keyword)) {
          console.log(`Found keyword: ${keyword}`);
          // Get context around the keyword
          const index = content.indexOf(keyword);
          const context = content.substring(Math.max(0, index - 200), Math.min(content.length, index + 200));
          console.log(`Context: ...${context}...`);
        }
      });

      // Save the file for manual inspection
      const fileName = jsFile.split('/').pop();
      fs.writeFileSync(`/Users/andrejandrasik/kursna-lista/nlb_${fileName}`, content);
      console.log(`\nSaved to nlb_${fileName}`);

    } catch (error) {
      console.error(`Error fetching ${jsFile}:`, error.message);
    }
  }

  // Now try to find the data endpoint by looking at common patterns
  console.log('\n\n=== TRYING COMMON API ENDPOINTS ===');

  const potentialEndpoints = [
    '/api/exchange-rates',
    '/api/currency',
    '/api/kursna-lista',
    '/content/nlb/rs/sr/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista.model.json',
    '/content/nlb/rs/sr/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista.exchange.json',
    '/content/nlb/rs/sr/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista/_jcr_content.exchange.json',
    '/bin/nlb/exchange-rates',
    '/bin/nlb/currency',
  ];

  for (const endpoint of potentialEndpoints) {
    try {
      console.log(`\nTrying: ${baseUrl}${endpoint}`);
      const response = await axios.get(baseUrl + endpoint, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        },
        timeout: 5000
      });

      console.log(`SUCCESS! Status: ${response.status}`);
      console.log(`Content-Type: ${response.headers['content-type']}`);
      console.log(`Response preview:`, JSON.stringify(response.data).substring(0, 500));

      // Save successful response
      fs.writeFileSync(
        `/Users/andrejandrasik/kursna-lista/nlb_api_response_${endpoint.replace(/\//g, '_')}.json`,
        JSON.stringify(response.data, null, 2)
      );

    } catch (error) {
      if (error.response) {
        console.log(`Failed with status: ${error.response.status}`);
      } else {
        console.log(`Failed: ${error.message}`);
      }
    }
  }
}

fetchJavaScriptFiles();
