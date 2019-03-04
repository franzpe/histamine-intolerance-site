const fs = require('fs-extra');

try {
  fs.copySync('package.json', 'build/package.json');
  console.log('package.json copied to build directory');
} catch (err) {
  console.log(err);
}
