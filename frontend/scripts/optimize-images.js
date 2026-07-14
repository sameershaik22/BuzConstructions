// Image optimization script — converts PNGs to high-quality JPEGs using Sharp
// Photos don't need PNG (lossless). JPEG at quality 85 = identical visual quality, 5-8x smaller.
// Run: node scripts/optimize-images.js

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const INPUT_DIR = path.join(__dirname, '../public/images')
const files = fs.readdirSync(INPUT_DIR).filter(f => /\.(png|jpg|jpeg)$/i.test(f))

let totalBefore = 0
let totalAfter = 0

;(async () => {
  console.log(`\n🔧  Converting ${files.length} images to optimized JPEG...\n`)

  for (const file of files) {
    const filePath = path.join(INPUT_DIR, file)
    const stat = fs.statSync(filePath)
    totalBefore += stat.size

    // Check if image has transparency (alpha channel) — skip if so
    let meta
    try {
      meta = await sharp(filePath).metadata()
    } catch {
      totalAfter += stat.size
      console.log(`  ⚠️   ${file} — skipped (unreadable)`)
      continue
    }

    const hasAlpha = meta.channels === 4 || meta.hasAlpha
    if (hasAlpha) {
      // Keep as PNG but compress it
      const tmpPath = filePath + '.tmp'
      try {
        await sharp(filePath).png({ compressionLevel: 9, effort: 10 }).toFile(tmpPath)
        const newStat = fs.statSync(tmpPath)
        if (newStat.size < stat.size) {
          fs.renameSync(tmpPath, filePath)
          totalAfter += newStat.size
          const saved = Math.round((1 - newStat.size / stat.size) * 100)
          console.log(`  🔷  ${file.padEnd(52)} ${Math.round(stat.size/1024)}KB → ${Math.round(newStat.size/1024)}KB  (-${saved}%) [PNG kept - has alpha]`)
        } else {
          fs.unlinkSync(tmpPath)
          totalAfter += stat.size
          console.log(`  ⏭   ${file.padEnd(52)} ${Math.round(stat.size/1024)}KB (optimal)`)
        }
      } catch {
        if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath)
        totalAfter += stat.size
      }
      continue
    }

    // No alpha — convert to JPEG for massive savings
    const jpgPath = filePath.replace(/\.png$/i, '.jpg')
    const tmpPath = jpgPath + '.tmp'

    try {
      await sharp(filePath)
        .jpeg({ quality: 85, progressive: true, mozjpeg: true })
        .toFile(tmpPath)

      const newStat = fs.statSync(tmpPath)
      totalAfter += newStat.size

      const saved = Math.round((1 - newStat.size / stat.size) * 100)
      console.log(`  ✅  ${file.padEnd(52)} ${Math.round(stat.size/1024)}KB → ${Math.round(newStat.size/1024)}KB  (-${saved}%) [PNG→JPG]`)

      // Rename tmp to final jpg
      fs.renameSync(tmpPath, jpgPath)
      // Remove original PNG if different filename
      if (jpgPath !== filePath) fs.unlinkSync(filePath)

    } catch (err) {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath)
      totalAfter += stat.size
      console.log(`  ⚠️   ${file} — skipped (${err.message})`)
    }
  }

  const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)
  const savedPct = Math.round((1 - totalAfter / totalBefore) * 100)
  console.log(`\n🎉  Done! Saved ${savedMB} MB  (${savedPct}% reduction)`)
  console.log(`    Before: ${(totalBefore/1024/1024).toFixed(1)} MB  →  After: ${(totalAfter/1024/1024).toFixed(1)} MB\n`)
  console.log(`⚠️  NOTE: Image references in code still use .png extensions.`)
  console.log(`    Run the update-image-refs script next to fix all imports.\n`)
})()
