const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

let logger = function(req,res,next) {
  // Print the URL of the request to the console
  console.log(req.method + ": " + req.url);
  next();
}

// Inject the log handler into the call stack
app.use(logger);

// Setup CORS to use with this site
app.use(cors());

// Setup the static site to serve
// @TODO - Configure environement for the path
let staticPath = path.join(__dirname,"../dist");
console.log("Serving static path: ",staticPath);
app.use(express.static(staticPath));

// Start the app listening on port 8000
// @TODO - Configure environment variables for port and bind address
app.listen(8081,"0.0.0.0",() => {
  console.log("JWA static listening on port 8000!");
});
