const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {

    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        //now to register this in database we do use register method :))
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to LiveHousify!");
            res.redirect("/listings");
        });
        

    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup"); 
    }
    
   

}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async (req,res)=>{
    req.flash("success","Welcome back to LiveHousify!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{    //generally error nhi aata coz as such we're not performing any operation bs kuch information we're just deleting.
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");

    });//ye apne aap mai callback ko leta haii as parameter. means jese hei user loggedout ho jaye toh immediately kya kaam hona chaiye woh
      //we'll see.
}