// Load environment variables
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const paymentRouter = require("./routes/payment.js");
const bookingsRouter = require("./routes/bookings.js");

const MONGO_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

  async function main() {
    try {
      await mongoose.connect(MONGO_URL);
    } catch (err) {
      console.log("Failed to connect to MongoDB:", err);
      throw err;
    }
  }

// Set up EJS and views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Session configuration with MongoDB store for production
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Use MongoDB session store in production
if (process.env.NODE_ENV === "production") {
  const MongoStore = require("connect-mongo");
  sessionOptions.store = MongoStore.create({
    mongoUrl: MONGO_URL,
    touchAfter: 24 * 3600, // time period in seconds
  });
}

app.use(session(sessionOptions));

// Flash messages setup
app.use(flash());

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// Serialize and deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to make flash messages available in all views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user || null;
  next();
});

// Test route for deployment
app.get("/", (req, res) => {
  res.send("WanderLust API is running! Database: " + (process.env.DB_URL ? "Configured" : "Not configured"));
});

// Simple test route without database
app.get("/test", (req, res) => {
  res.send("WanderLust test route working!");
});

// Simple JSON test route
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "WanderLust API working!", 
    database: process.env.DB_URL ? "Configured" : "Not configured",
    timestamp: new Date().toISOString()
  });
});

// Simple working routes
app.get("/listings", (req, res) => {
  res.send("Listings page - Working!");
});

app.get("/login", (req, res) => {
  res.send("Login page - Working!");
});

app.get("/signup", (req, res) => {
  res.send("Signup page - Working!");
});

// Routes - Temporarily commented out to fix deployment
// app.use("/listings", listingRouter);
// app.use("/listings/:id/reviews", reviewsRouter);
// app.use("/", userRouter);
// app.use("/payment", paymentRouter);
// app.use("/bookings", bookingsRouter);

// 404 Handler
app.all("*", (req, res) => {
  res.status(404).json({ 
    error: "Page Not Found!", 
    statusCode: 404,
    timestamp: new Date().toISOString()
  });
});

// Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ 
    error: message, 
    statusCode,
    timestamp: new Date().toISOString()
  });
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});