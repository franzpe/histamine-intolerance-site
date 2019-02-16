const fs = require('fs-extra');

const clientdir = 'build/client';
if (!fs.existsSync(clientdir)) {
  fs.mkdirSync(clientdir);
}

try {
  fs.copySync('client/build', 'build/client', { dereference: true });
  console.log(`Client copied to ${clientdir} directory`);
} catch (err) {
  console.log(err);
}
