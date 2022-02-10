const express = require("express");
const { getAllItems } = require("../data/shop");
const router = express.Router();
const fs = require("fs");

router.get("/", async (req, res, next) => {
  //Send list of all items to the client
  try {
    const itemList = await getAllItems();
    res.send(itemList);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  // Add item to list
  try {
    fs.readFile(
      "./data/items.json",
      "utf8",
      function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          const list = JSON.parse(data); //now it an object
          list.push(req.body); //add some data
          json = JSON.stringify(list); //convert it back to json
          fs.writeFile("./data/items.json", json, "utf8", async () => {
            console.log("added");
            const itemList = await getAllItems();
            res.send(itemList);
          }); // write it back
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.delete("/", async (req, res, next) => {
  // Remove item from list
  try {
    fs.readFile(
      "./data/items.json",
      "utf8",
      function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          const list = JSON.parse(data); //now it an object
          const updatedArray = list.filter((element) => {
            return element.id !== req.body.id;
          });
          json = JSON.stringify(updatedArray); //convert it back to json
          fs.writeFile("./data/items.json", json, "utf8", async () => {
            console.log("removed");
            const itemList = await getAllItems();
            res.send(itemList);
          }); // write it back
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.put("/", async (req, res, next) => {
  // Change item to bought
  try {
    fs.readFile(
      "./data/items.json",
      "utf8",
      function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          const list = JSON.parse(data); //now it an object
          const itemToChange = list.find(({ id }) => id === req.body.id);
          console.log("ITEMMMM: ", itemToChange);
          itemToChange.status = 1;
          json = JSON.stringify(list); //convert it back to json
          fs.writeFile("./data/items.json", json, "utf8", async () => {
            console.log("Updated");
            const itemList = await getAllItems();
            res.send(itemList);
          }); // write it back
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
