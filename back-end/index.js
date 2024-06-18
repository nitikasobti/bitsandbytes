import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
//import "./auth/mongoAuth.js"
import mongoRoutes from "./routes/mongoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js"
import instructorRoutes from "./routes/instructorRoutes.js";
import quizRoutes from "./routes/quizRoutes.js"
import LocalStrategy from "passport-local";
import User from "./models/userModel.js";

const PORT = process.env.PORT;
const app = express();
//middleware for parsing req body in json
app.use(express.json());
//middleware for CORS policy
app.use(
  cors({
    origin: "http://localhost:3000", // replace with your client app URL
    credentials: true,
  })
);
const mongoDBURL = process.env.DB_URL;
//session
const secret = process.env.SECRET ;
const store = MongoStore.create({
  mongoUrl: mongoDBURL,
  dbName:'LMS',
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});
store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});
const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    //secure:true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
// session middleware
app.use(session(sessionConfig));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Passport LocalStrategy for authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    User.authenticate()
  )
);

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Middleware to set currentUser in locals
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.get("/", (req, res) => {
  res.send("Homepage");
});
app.use("/", mongoRoutes);
app.use("/user",userRoutes);
app.use("/course",courseRoutes);
app.use("/instructor",instructorRoutes);
app.use("/quiz",quizRoutes);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.all("*", (req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});
