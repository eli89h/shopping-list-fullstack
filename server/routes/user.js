const express = require("express");
const { getUser, updateUser } = require("../data/user");
const { upload } = require("../lib/uploadFile");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const user = await getUser();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

router.put("/update", async (req, res) => {
  try {
    await updateUser(req.body);
    const updatedUser = await getUser();
    res.send(updatedUser);
  } catch (error) {
    console.log(error);
  }
});

router.put(
  "/user-pic-upload",
  upload.single("picture"),
  async (req, res, next) => {
    try {
      if (!req.file.path) return;
      //res.send(req.file.path);
      return res.json({ picture: req.file.path, message: "user pic saved" });
    } catch (error) {
      console.log(error);
      next();
    }
  }
);
module.exports = router;
