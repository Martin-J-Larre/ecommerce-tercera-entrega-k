const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/UserModel");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                // console.log("User --------->",user);
                //Todo: usar if de una sola linea e look up about
                if(!user) done(null, false)
                if(await user.checkPassword(password)) return done(null, user);
                done(null, false)
            } catch (err) {
                done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    try {
        const user = await User.findOne({ _id });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

