const fs = require("fs");

const path = "./data/user.json";
const getUser = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, buffer) => {
      if (err) reject(err);
      else resolve(JSON.parse(buffer.toString()));
    });
  });
};

exports.getUser = getUser;

async function prepareUser(user) {
  let detailsToUpdate = {};
  const entries = Object.entries(user);
  for (let property of entries) {
    if (property[1] !== "") {
      const key = property[0];
      const value = property[1];
      detailsToUpdate[key] = value;
    }
  }
  return detailsToUpdate;
}

const updateUser = async (user) => {
  const detailsToUpdate = await prepareUser(user);
  return new Promise((resolve, reject) => {
    fs.readFile(
      "./data/user.json",
      "utf8",
      function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          const user = JSON.parse(data); //now it an object
          for (let key of Object.keys(user)) {
            if (detailsToUpdate.hasOwnProperty(key)) {
              user[key] = detailsToUpdate[key];
            }
          }
          json = JSON.stringify(user); //convert it back to json
          fs.writeFile(path, JSON.stringify(user), (err) => {
            if (err) reject(err);
            else resolve();
          });
          // write it back
        }
      }
    );
  });
};

exports.updateUser = updateUser;
