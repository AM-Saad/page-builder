const express = require("express");
const templateController = require("../controllers/template");
const isAuth = require("../middleware/isAuth");
const { body } = require("express-validator/check");
const router = express.Router();

router.get("/", templateController.templates);
router.get("/:name", templateController.template);
router.get("/edit/:name", templateController.edit);
// router.post("/:name",  templateController.save);



module.exports = router;
