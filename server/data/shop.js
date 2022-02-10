const fs = require("fs");

const path = "./data/items.json";
const getAllItems = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, buffer) => {
      if (err) reject(err);
      else resolve(JSON.parse(buffer.toString()));
    });
  });
};
exports.getAllItems = getAllItems;
