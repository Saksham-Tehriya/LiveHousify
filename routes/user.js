const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup").get(userController.renderSignupForm).post(wrapAsync(userController.signup));

router.route("/login").get(userController.renderLoginForm).post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), userController.login);

//now very important listen = user ko jo authenticate krne ka kaam hai authenticate yani ye identify krna ki user phle se hamare database ke inside 
//tha ya nhi tha woh wla kaam hamare liye passport krke dega and passport ous kaam ko as a middleware krta hai.



router.get("/logout", userController.logout);


module.exports = router;
