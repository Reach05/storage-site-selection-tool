// filepath: scripts/copy-arcgis-assets.js
import { emptyDir, copy } from 'fs-extra'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = path.resolve(__dirname, '../node_modules/@arcgis/core/assets')
const dest = path.resolve(__dirname, '../public/arcgis/assets')

async function main() {
  await emptyDir(dest)
  await copy(src, dest)
  console.log('✅ ArcGIS assets copied to public/arcgis/assets')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})