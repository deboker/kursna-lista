import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function analyzeNLBPage() {
  console.log('Fetching NLB Komercijalna Banka exchange rates page...');

  try {
    // First, fetch the main page
    const response = await axios.get('https://www.nlbkb.rs/stanovnistvo/pomoc-i-alati/kompletna-kursna-lista', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    console.log('Status:', response.status);
    console.log('Content-Type:', response.headers['content-type']);

    const html = response.data;
    const $ = cheerio.load(html);

    // Save the HTML for inspection
    fs.writeFileSync('/Users/andrejandrasik/kursna-lista/nlb_page.html', html);
    console.log('HTML saved to nlb_page.html');

    // Look for any script tags that might contain API endpoints or data
    console.log('\n=== ANALYZING SCRIPTS ===');
    const scripts = [];
    $('script').each((i, elem) => {
      const src = $(elem).attr('src');
      const content = $(elem).html();

      if (src) {
        scripts.push({ type: 'external', src });
        console.log(`External script: ${src}`);
      }

      if (content) {
        // Look for API endpoints, fetch calls, or embedded data
        if (content.includes('api') || content.includes('fetch') || content.includes('axios') ||
            content.includes('kurs') || content.includes('EUR') || content.includes('USD')) {
          scripts.push({ type: 'inline', preview: content.substring(0, 500) });
          console.log('\nInline script with potential data:');
          console.log(content.substring(0, 1000));
        }
      }
    });

    // Look for tables
    console.log('\n=== ANALYZING TABLES ===');
    const tables = [];
    $('table').each((i, table) => {
      const tableData = [];
      $(table).find('tr').each((j, row) => {
        const rowData = [];
        $(row).find('td, th').each((k, cell) => {
          rowData.push($(cell).text().trim());
        });
        if (rowData.length > 0) {
          tableData.push(rowData);
        }
      });

      if (tableData.length > 0) {
        tables.push({
          index: i,
          className: $(table).attr('class'),
          id: $(table).attr('id'),
          rows: tableData
        });
        console.log(`\nTable ${i}:`, $(table).attr('class') || 'no class');
        console.log(JSON.stringify(tableData.slice(0, 10), null, 2));
      }
    });

    // Look for divs or elements that might contain exchange rate data
    console.log('\n=== SEARCHING FOR EXCHANGE RATE DATA ===');

    // Search for specific values
    const searchTerms = ['114.3593', '95.0444', 'EUR', 'USD', 'Kupovni', 'Srednji', 'Prodajni'];
    const findings = {};

    searchTerms.forEach(term => {
      const elements = $(`*:contains("${term}")`);
      if (elements.length > 0) {
        findings[term] = elements.length;
        console.log(`Found "${term}" in ${elements.length} elements`);
      }
    });

    // Look for data attributes or JSON data
    console.log('\n=== LOOKING FOR DATA ATTRIBUTES ===');
    $('[data-rates], [data-exchange], [data-currency], [data-kurs]').each((i, elem) => {
      console.log('Found data attribute:', elem.attribs);
    });

    // Check for iframe
    console.log('\n=== CHECKING FOR IFRAMES ===');
    $('iframe').each((i, iframe) => {
      console.log('Found iframe:', $(iframe).attr('src'));
    });

    // Try to find any JSON data in the page
    console.log('\n=== SEARCHING FOR JSON DATA ===');
    const jsonMatches = html.match(/\{[^{}]*"[^"]*"[^{}]*:[^{}]*\}/g) || [];
    jsonMatches.forEach((match, i) => {
      if (match.includes('EUR') || match.includes('USD') || match.includes('kurs')) {
        console.log(`\nPotential JSON data ${i}:`, match.substring(0, 200));
      }
    });

    // Save findings
    const findings_data = {
      scripts,
      tables,
      findings,
      url: response.config.url,
      status: response.status
    };

    fs.writeFileSync('/Users/andrejandrasik/kursna-lista/nlb_findings.json',
      JSON.stringify(findings_data, null, 2));

    console.log('\n=== FINDINGS SAVED ===');
    console.log('Check nlb_findings.json and nlb_page.html for details');

    // Now try to find potential API endpoints by looking at the network
    console.log('\n=== ATTEMPTING TO FIND API ENDPOINTS ===');

    // Look for common API patterns in scripts
    const apiPatterns = [
      /https?:\/\/[^'"]+api[^'"]+/gi,
      /https?:\/\/[^'"]+kurs[^'"]+/gi,
      /https?:\/\/[^'"]+exchange[^'"]+/gi,
      /\/api\/[^'"]+/gi,
      /fetch\(['"]([^'"]+)['"]/gi,
      /axios\.get\(['"]([^'"]+)['"]/gi,
    ];

    apiPatterns.forEach((pattern, i) => {
      const matches = html.match(pattern);
      if (matches) {
        console.log(`\nPattern ${i} matches:`, matches);
      }
    });

  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

analyzeNLBPage();
