console.log("client side js is loaded !!");

const weatherForm = document.querySelector("form");
const searchAddress = document.querySelector("input");
const messageZero = document.querySelector("#message-0");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageZero.textContent = "Loading.........";
  messageTwo.textContent = "";
  messageOne.textContent = "";

  fetch(`http://localhost:3000/weather?address=${searchAddress.value}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          //   console.log(data.error);
          messageZero.textContent = data.error;
        } else {
          messageZero.textContent = "";
          messageTwo.textContent = data.data;
          messageOne.textContent = data.location;
          document.querySelector("form").reset();
        }
      });
    }
  );
});
