const fs = require("fs");

if (process.argv.length < 3) {
  console.log("Usage: node app.js <port>");
  process.exit(1);
}
const file = process.argv[2];

fs.watch(file, function () {
  console.log("File changed!");
});

console.log("Now watching " + file);
