require("dotenv").config();
const express = require("express");
const next = require("next");
const formData = require("express-form-data");
const os = require("os");
const mongoose = require("mongoose");
const mongoSessionStore = require("connect-mongo");
const helmet = require("helmet");
const compression = require("compression");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const formDataOptions = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

/* Database config and connect and handle error */
const dbConnection = dev ? MONGO_URI_DEV : MONGO_URI;
const mongooseOptions = {
  useNewURLParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
};

mongoose
  .connect(process.env[dbConnection], mongooseOptions)
  .then(() => console.log(`-->${dev ? "Dev:" : "Prod: "} Database connected`));

mongoose.connection.on("error", (err) => {
  console.log(`Database connection ERROR: ${err.message}`);
});

/* prepare app for next */
app.prepare().then(() => {
  const server = express();

  /* Add helmet security and compression in production */
  if (!dev) {
    server.use(helmet());
    server.use(compression());
  }

  /* formatting requests */
  server.use(express.json());
  server.use(formData.parse(formDataOptions));
  server.use(formData.format());
  server.use(formData.stream());
  server.use(formData.union());

  /* Pass nextJS request to next */
  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });
  server.get("/static/*", (req, res) => {
    handle(req, res);
  });

  /* Custom Routes */
  server.use("/auth", require("./routes/auth"));

  /* handle all other requests */
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  /* Listening on port */
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`-> listening on port ${port}`);
  });
});
