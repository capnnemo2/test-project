// EXPRESS

const express = require("express");
const app = express();
const session = require("express-session");

app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.get("/", function (req, res) {
  res.render("pages/auth");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App listening on port " + port));

// PASSPORT

const passport = require("passport");
let userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.get("/success", (req, res) => res.send(userProfile));
app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// GOOGLE

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID =
  "80581960464-bvpktqd6ocihkc8hlhe0ngup63vgq5ph.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "tjbTEWwCq-fUC3KJdsbtnhdj";
passport.use(
  new GoogleStrategy(
    {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // successful authentication, redirect succss.
    res.redirect("/success");
  }
);
