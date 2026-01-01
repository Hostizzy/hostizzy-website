const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Image Optimization Script for Hostizzy
 * Converts PNG, JPG, JPEG images to WebP format
 * Maintains original aspect ratio and quality
 */

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const WEBP_QUALITY = 85; // Balance between quality and file size

// Directories to process
const DIRS_TO_PROCESS = [
  'images',
  'properties',
  'experiences',
  'team',
  'testimonials',
  'blog'
];

async function convertToWebP(filePath, outputPath) {
  try {
    const info = await sharp(filePath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    const originalSize = fs.statSync(filePath).size;
    const newSize = info.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);

    console.log(`✅ Converted: ${path.basename(filePath)} → ${path.basename(outputPath)}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(2)}KB → WebP: ${(newSize / 1024).toFixed(2)}KB (${savings}% smaller)`);

    return { success: true, savings, originalSize, newSize };
  } catch (error) {
    console.error(`❌ Error converting ${filePath}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️  Directory not found: ${dirPath}`);
    return [];
  }

  const files = fs.readdirSync(dirPath);
  const results = [];

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      const subResults = await processDirectory(filePath);
      results.push(...subResults);
    } else {
      const ext = path.extname(file).toLowerCase();

      if (IMAGE_EXTENSIONS.includes(ext)) {
        const outputPath = filePath.replace(ext, '.webp');

        // Skip if WebP version already exists and is newer
        if (fs.existsSync(outputPath)) {
          const originalTime = stat.mtime;
          const webpTime = fs.statSync(outputPath).mtime;

          if (webpTime > originalTime) {
            console.log(`⏭️  Skipping (WebP exists): ${file}`);
            continue;
          }
        }

        const result = await convertToWebP(filePath, outputPath);
        results.push({ file, ...result });
      }
    }
  }

  return results;
}

async function optimizeAllImages() {
  console.log('🎨 Starting Image Optimization for Hostizzy\n');
  console.log(`📂 Public directory: ${PUBLIC_DIR}\n`);

  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let successCount = 0;
  let errorCount = 0;

  for (const dir of DIRS_TO_PROCESS) {
    const dirPath = path.join(PUBLIC_DIR, dir);
    console.log(`\n📁 Processing: ${dir}/`);
    console.log('─'.repeat(60));

    const results = await processDirectory(dirPath);

    results.forEach(result => {
      if (result.success) {
        totalOriginalSize += result.originalSize;
        totalNewSize += result.newSize;
        successCount++;
      } else {
        errorCount++;
      }
    });
  }

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('═'.repeat(60));
  console.log(`✅ Successfully converted: ${successCount} images`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📦 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`📦 Total WebP size: ${(totalNewSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`💾 Total savings: ${((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2)}MB (${((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(2)}%)`);
  console.log('═'.repeat(60));

  console.log('\n💡 Next Steps:');
  console.log('1. Update image references in your code to use .webp extensions');
  console.log('2. Implement <picture> elements with fallbacks for older browsers');
  console.log('3. Consider keeping original images as fallbacks\n');
}

// Run the optimization
optimizeAllImages().catch(console.error);
