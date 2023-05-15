const express = require("express");
// const { body } = require("express-validator/check");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/isAuth");
const router = express.Router();


router.post("/login", adminController.login);

router.get("/articles", isAuth, adminController.articles);
router.get("/articles/:id", isAuth, adminController.getArticle);
router.post("/articles", isAuth, adminController.createArticle);
router.delete("/articles/:id", isAuth, adminController.deleteArticle);
router.put("/articles/:id", isAuth, adminController.editArticle);


router.get("/users", isAuth, adminController.users);
router.get("/users/:id", isAuth, adminController.getUser);
router.delete("/users/:id", isAuth, adminController.deleteUser);


router.post('/media', adminController.uploadImage)



module.exports = router;
