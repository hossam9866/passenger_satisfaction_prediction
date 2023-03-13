window.onload = () => {
  let sliderShows = document.querySelectorAll(".slider-show");
  let sliders = document.querySelectorAll(".range");
  for (let i = 0; i < sliderShows.length; i++) {
    sliderShows[i].innerText = sliders[i].value;
    sliders[i].addEventListener("input", (event) => {
      sliderShows[i].innerText = event.target.value;
    });
  }
  let ratesArray = [
    "WIFI Service Rate",
    "Gate location Rate",
    "Online Boarding Rate",
    "Seat comfort Rate",
    "On-board service Rate",
    "Baggage Handling Rate",
    "Check in Service Rate",
    "Inflight Service Rate",
    "Cleanliness Rate",
  ];
  ratesArray.forEach((e) => {
    let element = document.createElement("div");
    element.setAttribute("id", e.replaceAll(" ", "-"));
    element.classList.add("radio-section");
    element.innerHTML = `
      <p class="ques">${e}</p>
      <div class="radios">
      <div class="option">
                  <input
                  type="radio"
                  class="radio"
                  name="${e}"
                
                   />
                <p >0</p>
                </div>
                <div class="option">
                  <input
                  type="radio"
                  class="radio"
                  name="${e}"
                   />
                <p >1</p>
                </div>
              <div class="option">
                  <input
                  type="radio"
                  class="radio"
                  name="${e}"
                   />
                <p >2</p>
                </div>
                <div class="option">
                  <input
                  type="radio"
                  class="radio"
                  name="${e}"
                  checked
                   />
                <p >3</p>
                </div>
                <div class="option">
                  <input
                  type="radio"
                  class="radio"
                  name="${e}"
                  value="4"
                  
                   />
                <p >4</p>
                </div>
                <div class="option">
                  <input
                  type="radio"
                  class="radio"
                  name="${e}"
                   />
                <p >5</p>
                </div>
            </div>
            </div>
    `;
    document.querySelector("#rates").appendChild(element);
  });

  window.addEventListener("click", (event) => {
    if (event.target.getAttribute("id") == "restore") {
      document.getElementById("not-ok").style.display = "none";
      document.getElementById("ok").style.display = "none";
      document.getElementById("content").style.display = "flex";
      document.getElementById("gb").value = "";
      document.getElementById("sub-years").value = 0.9;
      document.querySelector(".slider-show").innerText = 0.9;
      document.getElementById("left-years").value = 0;
      document.getElementById("times-fail").value = 0;
      document.querySelectorAll(".slider-show")[1].innerText = 0;
      document.querySelectorAll(".slider-show")[2].innerText = 0;
    }
  });
  let ratesQuery = {
    "WIFI Service Rate": "Inflight_wifi_service",
    "Gate location Rate": "Gate_location",
    "Online Boarding Rate": "Online_boarding",
    "Seat comfort Rate": "Seat_comfort",
    "On-board service Rate": "Onboard_service",
    "Baggage Handling Rate": "Baggage_handling",
    "Check in Service Rate": "Checkin_service",
    "Inflight Service Rate": "Inflight_service",
    "Cleanliness Rate": "Cleanliness",
  };

  document.querySelector("#submit").onclick = (event) => {
    event.preventDefault();
    let query = "";
    ratesArray.forEach((rate) => {
      console.log(rate.replaceAll(" ", "-"));
      let value = parseFloat(
        document
          .getElementById(rate.replaceAll(" ", "-"))
          .querySelector("input:checked")
          .parentNode.querySelector("p").innerText
      );
      query += ratesQuery[rate] + "=" + value + "&";
    });
    query += "Age=" + document.getElementById("age").value + "&";
    query += "Class=" + document.getElementById("class").value + "&";
    query +=
      "Type_of_Travel=" +
      document
        .getElementById("type-of-travel")
        .querySelector("input:checked")
        .getAttribute("value") +
      "&";

    query +=
      "Customer_Type=" +
      document
        .getElementById("customer-type")
        .querySelector("input:checked")
        .getAttribute("value");
    console.log(query);
    let url = `https://satisfaction-prediction-app.herokuapp.com/predict?${query}`;
    console.log(url);
    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        if (data == 1) {
          document.getElementById("content").style.display = "none";
          document.getElementById("ok").style.display = "block";
        } else {
          document.getElementById("content").style.display = "none";
          document.getElementById("not-ok").style.display = "block";
        }
      });
  };
};
