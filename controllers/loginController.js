const db = require("../models/index"),
    User = db.user,
    passport=require("passport"),
    httpStatus = require("http-status-codes"),
    getUserParams = body => {
        return {
            user_id: body.user_id,
            password: body.password,
            password2: body.password2,
            name: body.name,
            nickname: body.nickname,
            email: body.email,
            birthdate: body.birthdate,
            gender: body.gender
        };
    };

module.exports = {
    
    authenticate: passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/login",
        failureFlash: "Failed to login.",
        successFlash:"Logged in!"

    }),

    create: async(req,res, next) => {
        if(req.skip) next();
        let userParams = getUserParams(req.body);
        try { 
            let user = new User(userParams);
            User.register(user, req.body.password, (error, user)=>{
                if(user){
                    req.flash("success", `반가워요 ${user.nickname}님 로그인 해보세요!`);
                    res.locals.redirect = "/users/create";
                    res.locals.user = user;
                    next();
                }else{
                    res.locals.redirect = "/users/signup";
                    console.log(`Error from signup : ${error.message}`);
                    req.flash("error", "Failed to login");
                    next(error);
                }
            });
        } catch (error) {
            console.log(`Error from signup : ${error.message}`);
            res.locals.redirect="/users/signup";
            req.flash("error", "Failed to login");
            next(error);
        };
    }, 

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath!= undefined) res.redirect(redirectPath);
        else next();
    },

    delete: async (req, res, next) =>{
        let userId = req.params.id;
        try {
            let user = await User.findByPkAndRemove(userId);
            res.locals.redirect = "/";
            next();
        } catch (error) {
            next(error);
        }
    },

    login: (req, res) => {
        res.render("login");
    }, 

    checkLogin: (req, res, next) =>{
        if(res.locals.loggedIn){
            next();
        }else{
            let errCode = httpStatus.UNAUTHORIZED;
            res.status(errCode);
            res.render("need-login");
            }
    },

    logout: (req, res, next)=>{
        req.logout((err)=>{
            req.flash("success", "You have been logged out!");
            res.locals.redirect="/"
            next();
        })
    },

    signup: (req, res) => {
        res.render("signup");
    },
    
    signupSuccess: (req, res)=>{
        res.render("create");
    }

};


