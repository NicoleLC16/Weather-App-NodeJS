const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=772fbbc5b958b916433a90e0d8ceb071&query=${latitude},${longitude}&units=f`;

  request({ url: weatherUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}: It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
