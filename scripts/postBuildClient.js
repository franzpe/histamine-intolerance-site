const fs = require('fs-extra');

const clientOutputdir = 'build/client';
const clientDir = 'client/build';

if (!fs.existsSync(clientOutputdir)) {
  fs.mkdirSync(clientOutputdir);
}

try {
  fs.copySync(clientDir, clientOutputdir, { dereference: true });
  console.log(`Client copied successfully to ${clientOutputdir} directory`);
  fs.removeSync(clientDir);
} catch (err) {
  console.log(err);
}
