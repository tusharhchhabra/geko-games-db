const fs = require('fs');
const PNG = require('png-js');
const IMG_WIDTH = 1920;

PNG.decode('bugMask.png', function (data) {
  const result = {};
  for (let i = 0; i < data.length; i += 4) {
    const row = Math.floor(i / 4 / IMG_WIDTH);
    if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
      if (result[row]) {
        result[row].push((i / 4) % IMG_WIDTH);
      } else {
        result[row] = [(i / 4) % IMG_WIDTH];
      }
    }
  }
  fs.writeFileSync(
    './bugBounds.js',
    'export const mapBounds = ' + JSON.stringify(result),
  );
});