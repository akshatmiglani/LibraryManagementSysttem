const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const searchRoutes = require("./routes/searchRoute");
const bodyParser = require("body-parser");
const borrowRoutes = require("./routes/borrowBooks");
const filterRoutes = require("./routes/filterRoutes");
const jwt = require('jsonwebtoken');
const router = express.Router();

const logRoutes=require("./routes/logs")
const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/filter", filterRoutes);

app.use('/api/logs', logRoutes);

// **********************************************************************
router.get("/verify-token", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.json({ user: decoded });
  });
});

app.listen(PORT, () => {
  console.log(`Server is runnin...`);
});
