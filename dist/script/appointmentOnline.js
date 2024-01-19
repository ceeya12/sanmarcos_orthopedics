"use strict";

//dom elements

const submitBtn = document.getElementById("submitBtn");
const xrayForm = document.getElementById("submission");
const primaryCareRadioBtns = xrayForm.referral;

const getPrimaryCareReferral = function () {
  for (let i = 0; i < primaryCareRadioBtns.length; i++) {
    primaryCareRadioBtns[i].addEventListener("change", (e) => {
      console.log(e.target.value);
    });
  }
};

//const radioButtons = xrayForm.elements["imagingRadio"];
const radioButtonsXrays = xrayForm.imagingRadio;
console.log(radioButtonsXrays);

for (let i = 0; i < radioButtonsXrays.length; i++) {
  radioButtonsXrays[i].addEventListener("change", function (e) {
    console.log(e.target.value);
  });
}

//form section for Surgeon selction dropdown
const surgeonSelect = document.getElementById("surgeonSelect");

function init() {
  surgeonSelect.addEventListener("change", updateSurgeon);

  function updateSurgeon(event) {
    const value = event.target.value;
    // const index = this.selectedIndex;
    // const option = this.item(index);

    console.log(value);
  }
}
init();

const locationChoice = document.getElementById("locationChoice");
locationChoice.addEventListener("change", function (e) {
  const value = e.target.value;
  console.log(value);
});

const insuranceProvider = document.getElementById("insuranceOption");
insuranceProvider.addEventListener("change", function (e) {
  const value = e.target.value;
  console.log(value);
});

function sendMail() {
  console.log("Button Clicked");
  const params = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    mobileNumber: document.getElementById("mobileNumber").value,
    Message: document.querySelector("textarea").value,
    primaryCareProvider: primaryCareRadioBtns.value,
    radioButtonXrays: radioButtonsXrays.value,
    surgeonSelect: surgeonSelect.value,
    locationChoice: locationChoice.value,
    insuranceProvider: insuranceProvider.value,
  };

  const serviceId = "service_90n3yrq";
  const templateId = "template_1gk6e3d";

  emailjs
    .send(serviceId, templateId, params)
    .then((res) => {
      document.getElementById("firstName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("injuryDetails").value = "";
      console.log(res);
      alert("Your message has been sent successfully");
    })
    .catch((err) => console.log(err));
}

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  sendMail();
});
