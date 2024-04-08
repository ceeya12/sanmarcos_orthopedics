"use strict";

// const url =
//   "https://mybusiness.googleapis.com/v4/{parent=san marcos orthopedics/*/locations/*}/reviews";

// const getReviews = async function () {
//   const getJSONData = await fetch(url);
//   const reviews = await getJSONData.json();
//   console.log(reviews);
// };

// getReviews();

const request = new XMLHttpRequest();

request.open(
  "GET",
  "https://mybusiness.googleapis.com/v4/{name=accounts/*/locations/*/reviews/*}"
);
request.send();

console.log(request.responseText);

//event listener for all data pulled

request.addEventListener("load", function () {
  const data = JSON.parse(this.responseText);

  //console.log(this.responseText);

  console.log(data);
});
