const fs = require('fs/promises');

async function main() {
  const filename = process.argv[2];

  if (!filename) {
    console.log('Usage: node file-reader.js <filename>');
    process.exit(1);
  }

  try {
    const content = await fs.readFile(filename, 'utf-8');
    const stats = await fs.stat(filename);
    const lineCount = content.split('\n').length;

    console.log('File contents:');
    console.log(content);
    console.log(`Size: ${stats.size} bytes`);
    console.log(`Lines: ${lineCount}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`File not found: ${filename}`);
    } else {
      console.error('Error reading file:', err.message);
    }
    process.exit(1);
  }
}

main();
