const fs = require('fs');

let rawdata = fs.readFileSync('abi.json');
let student = JSON.parse(rawdata);
console.log(student);