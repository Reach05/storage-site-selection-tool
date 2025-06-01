import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const tracePath = join(process.cwd(), '.next', 'trace');
const text = readFileSync(tracePath, 'utf8');

// find all top-level JSON arrays
const arrays = text.match(/\[[\s\S]*?\]/g);
if (!arrays?.length) {
  console.error('No JSON arrays found in .next/trace');
  process.exit(1);
}

// parse and flatten
const combined = arrays
  .map(a => JSON.parse(a))
  .flat();

writeFileSync(tracePath, JSON.stringify(combined, null, 2));
console.log('✅ .next/trace flattened into a single JSON array');