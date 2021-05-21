const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlesbars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

//for dynamic page using hbs, use render
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nicole",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nicole",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Find help here",
    name: "Nicole",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error!",
    message: "Help Article Not Found!",
    name: "Nicole",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error!",
    message: "Page not found!",
    name: "Nicole",
  });
});

//listens in on a port to start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
