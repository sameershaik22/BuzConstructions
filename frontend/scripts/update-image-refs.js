// Updates all .png image references to .jpg across all source files
// Run: node scripts/update-image-refs.js

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css', '.html', '.json']

// Walk directory recursively, skip node_modules / .next / .git
function walkDir(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (['node_modules', '.next', '.git', 'scripts'].includes(entry.name)) continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) walkDir(fullPath, fileList)
    else if (EXTENSIONS.includes(path.extname(entry.name))) fileList.push(fullPath)
  }
  return fileList
}

const files = walkDir(ROOT)
let totalReplaced = 0
let filesChanged = 0

// Regex: match /images/something.png (with quote or backtick or space after)
const PNG_REGEX = /(\/images\/[^"'`\s)]+)\.png/g

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8')
  const updated = original.replace(PNG_REGEX, '$1.jpg')
  if (updated !== original) {
    fs.writeFileSync(file, updated, 'utf8')
    const count = (original.match(PNG_REGEX) || []).length
    totalReplaced += count
    filesChanged++
    console.log(`  ✅  ${path.relative(ROOT, file).padEnd(60)} (${count} reference${count > 1 ? 's' : ''} updated)`)
  }
}

console.log(`\n🎉  Done! Updated ${totalReplaced} references across ${filesChanged} files.\n`)
