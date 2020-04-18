require("dotenv").config();
const express = require("express");
const next = require("next");
const formData = require("express-form-data");
const os = require("os");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const formDataOptions = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

/*## database config */
// TODO: dbConnect and mongooseOpts

/* prepare app for next */
app.prepare().then(() => {
  const server = express();

  /* formatting requests */
  server.use(express.json());
  server.use(formData.parse(formDataOptions));
  server.use(formData.format());
  server.use(formData.stream());
  server.use(formData.union());

  // TODO: add the routes

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`-> listening on port ${port}`);
  });
});
