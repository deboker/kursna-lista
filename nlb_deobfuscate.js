import fs from 'fs';

// Read the minified JS
const js = fs.readFileSync('/Users/andrejandrasik/kursna-lista/nlb_clientlib-site.lc-d8028e906b6ce27e509cf4eec2bdcb88-lc.min.js', 'utf-8');

// Find the section related to currency exchange
const exchangeStart = js.indexOf('js-currency-exchange');
if (exchangeStart !== -1) {
  // Get context around this section (10000 chars before and after)
  const context = js.substring(Math.max(0, exchangeStart - 10000), Math.min(js.length, exchangeStart + 10000));

  // Save to file for analysis
  fs.writeFileSync('/Users/andrejandrasik/kursna-lista/nlb_exchange_context.js', context);
  console.log('Saved exchange context');

  // Look for .json patterns in this section
  const jsonPatterns = context.match(/['"]\S+\.json['"]/g);
  if (jsonPatterns) {
    console.log('\nJSON endpoints found in exchange section:');
    jsonPatterns.forEach(pattern => console.log(pattern));
  }

  // Look for fetch or service path usage
  const fetchPatterns = context.match(/\w+\+['"]\S+\.json['"]/g);
  if (fetchPatterns) {
    console.log('\nDynamic JSON endpoints:');
    fetchPatterns.forEach(pattern => console.log(pattern));
  }

  // Look for service path concatenation
  const servicePathPattern = /servicePath\s*\+\s*['"](.*?)['"]/g;
  let match;
  while ((match = servicePathPattern.exec(context)) !== null) {
    console.log('\nService path usage:', match[0]);
    console.log('Suffix:', match[1]);
  }
}

// Also search for "customerdata" pattern which we found earlier
const customerdataPattern = /servicePath\s*\+\s*['"]\.customerdata\.[^'"]+['"]/g;
let customerdataMatch;
while ((customerdataMatch = customerdataPattern.exec(js)) !== null) {
  console.log('\nCustomerdata pattern:', customerdataMatch[0]);
}

// Search for patterns like ".exchange." or ".rates." or similar
const dataPatterns = [
  /servicePath\s*\+\s*['"]\.exchange[^'"]*['"]/g,
  /servicePath\s*\+\s*['"]\.rates[^'"]*['"]/g,
  /servicePath\s*\+\s*['"]\.data[^'"]*['"]/g,
  /servicePath\s*\+\s*['"][^'"]*date[^'"]*\.json['"]/g,
];

console.log('\n\n=== Searching for service path patterns ===');
dataPatterns.forEach((pattern, i) => {
  const matches = js.match(pattern);
  if (matches) {
    console.log(`\nPattern ${i}:`, pattern);
    matches.forEach(m => console.log('  -', m));
  }
});
