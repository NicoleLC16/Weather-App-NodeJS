//fetch
// const weatherUrl = "/weather?address=seattle";

const fetchLocation = (location) => {
  fetch(`/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
};

//element selectors
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//location form
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);

  messageOne.textContent = "Loading forecast...";
  messageTwo.textContent = "";

  fetchLocation(location);
});
