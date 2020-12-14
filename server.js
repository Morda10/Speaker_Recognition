const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
const path = require("path");
const xss = require('xss-clean')
const helmet = require('helmet')
const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(express.json({ limit: '10kb' })); // Body limit is 10
app.use(xss()); // sanitize user input coming from POST body, GET queries, and url params
app.use(helmet()); // secure app by setting various http headers


// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(morgan("dev"));

// Define Routes
app.use("/api/sample", require("./routes/api/sample"));
app.use("/api/spawnWords", require("./routes/api/spawnWords"));
//app.use('/api/user', middleware, require('./routes/api/user'));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
