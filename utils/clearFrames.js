const fullFramePath = process.argv[2];

const fs = require("fs");

const fullData = JSON.parse(fs.readFileSync(fullFramePath, "utf8"));

const newData = {
  ...fullData,
  control: {
    0: fullData.control["7748"],
  },
  position: {
    0: fullData.position["1184"],
  },
};

console.log(JSON.stringify(newData, null, 2));
