import { createRequire } from "module";
const require = createRequire(import.meta.url);
import geocode from "./utilis/geocode.js";
import weatherInfo from "./utilis/weatherInfo.js";
const express = require("express");
const hbs = require("hbs");
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup handelbar engine and views location
app.set("views", viewPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

//setup statis directry to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "anas bin arif",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "this is helpful page",
    title: "Help",
    name: "anas bin arif",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me!",
    name: "anas bin arif",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    // console.log("location", location);
    if (error) {
      return res.send({
        error,
      });
    }

    weatherInfo(latitude, longitude, (error, data) => {
      // console.log("data", data);
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        location,
        data,
        address: req.query.address,
      });
    });
  });
});

app.get("/about/*", (req, res) => {
  res.render("404", {
    errorMsg: "About article not found",
    name: "anas bin arif",
    title: "404",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "404 not found",
    name: "anas bin arif",
    title: "404",
  });
});

app.listen(port, () => {
  console.log("server is on port " + port);
});
