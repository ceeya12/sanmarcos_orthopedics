"use strict";

/////////////////////////////////////////////////////////////////
//Implementing full text search components
//Search Implementation

// const searchFieldForm = document.getElementById("searchField");
// const searchBtn = document.getElementById("searchBtn");
const closeModalBtn = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal_custom");

//Function for Opening Modal Window

const openModal = function () {
  modal.classList.remove("hidden_all");
  overlay.classList.remove("hidden_all");
};
//Function for closing Modal Window

const closeModal = function () {
  modal.classList.add("hidden_all");
  overlay.classList.add("hidden_all");
};

const getSearchData = async function () {
  try {
    const response = await fetch("/san_marcos_orthopedics_search_index.json");

    console.log(response.status);

    if (!response.ok) throw new Error("Problem Gettting data");

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    return error.message;
  }
};

async function retrieveSearchResults(query) {
  const posts = await getSearchData();

  // const fuse = new Fuse(posts);
  const fuse = new Fuse(posts, {
    keys: ["surgeons.specialities.value"],
  });

  const searchResults = fuse.search(query);

  return searchResults;
}

function generatePostHTML(post) {
  const renderHTML = `
  <p>${post.item.title}</p>
  <p>${post.item.phonenumber}</p>
  <p><a href="/johndrobinson.html">${post.item.surgeons.firstname} ${post.item.surgeons.lastname}</a></p>
  
  `;
  return renderHTML;
}

//Disable Scrolling during search input from

//event listeners

const searchForm = document.querySelector("#search-form");
const searchResults = document.querySelector("#search-results");

searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  openModal();

  const formData = new FormData(searchForm);
  const query = formData.get("search");

  const postsToDisplay = await retrieveSearchResults(query);

  searchResults.innerHTML = postsToDisplay.map(generatePostHTML).join("");
});

// searchBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   openModal();
//   console.log(`Button Clicked`);
// });

//close model event handlers
//modal button X
closeModalBtn.addEventListener("click", function () {
  closeModal();
});
//close modal event handler
//esc key and backspace
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden_all")) {
    closeModal();
  }

  if (e.key === "Backspace" && !modal.classList.contains("hidden_all")) {
    closeModal();
  }
});

/*Navy blue 3rd conatiner on index page */

const counters = document.querySelectorAll(".counter");
const containerDoctorCount = document.querySelector("section");

containerDoctorCount.addEventListener("mouseenter", function () {
  //loop to iterate through each number and display value

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = 1;

      // console.log(increment);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 100);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
});

((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({ key: "AIzaSyD7dJQe310hYqb1SXhwttNhjsKay8cDkao", v: "beta" });

// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: 29.851600686672842, lng: -97.94693195911728 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

initMap();
