"use strict";

const closeModalBtn = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal_custom");
const searchForm = document.querySelector("#search-form");
const searchResults = document.getElementById("search-results");
//images dom entry point for lazy loading images
// const imgTargets = document.querySelectorAll("img[data-src]");

/////////////////////////////////////////////////////////////////
//weglot translate services

// if (Weglot) {
//   Weglot.initialize({
//     api_key: "wg_f1252e6c3f441708e2a2c16c1461400c5",
//   });
// }

// console.log(Weglot);

/////////////////////////////////////////////////////////////////
//Implementing full text search components
//Search Implementation
//Function for Opening Modal Window when search input entered
//Full Text Search

const openModal = function () {
  modal.classList.remove("hidden_all");
  overlay.classList.remove("hidden_all");
};
//Function for closing Modal Window

const closeModal = function () {
  modal.classList.add("hidden_all");
  overlay.classList.add("hidden_all");
};

const disableScroll = function () {
  document.body.classList.add("remove-scrolling");
};
const enableScroll = function () {
  document.body.classList.remove("remove-scrolling");
};

//Full Text Search
//function that fetches json data
//locally stored json file

const getSearchData = async function () {
  try {
    const response = await fetch("search_index.json");

    console.log(response.status);

    if (!response.ok) throw new Error("Problem Gettting data");

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    return error.message;
  }
};

//Full Text Search
//function to call Fuse.js API
//keys are passed for search parameters

async function retrieveSearchResults(query) {
  //posts = san_marcos_orthopedics_search_index.json
  const posts = await getSearchData();
  const options = {
    keys: ["specialities.tags"],
    // keys: [["surgeons", "firstname", "lastname", "specialities", "value"]],
  };

  const fuse = new Fuse(posts, options);

  const searchResults = fuse.search(query);

  return searchResults;
}

//Full Text Search
// function to display HTML info on modal window
// with respective doctor
//<img src="/doctor_headshot_images/jd_robinson_thumbnail.png" alt="thumbnail surgeon"></img>

function generatePostHTML(post) {
  const renderHTML = `
      <div class="adjustment">
      <h3><a href="${post.item.href}">${post.item.surgeon}</a></h3>
      <p>${post.item.phonenumber}</p>
      <a class="btn" href="${post.item.href}">View Profile</a>
      </div>

  `;

  return renderHTML;
}

//Full text search
//Disable Scrolling during search input from
//event listener

document.addEventListener("DOMContentLoaded", () => {
  searchForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    openModal();
    disableScroll();

    const formData = new FormData(searchForm);
    const query = formData.get("search");

    const postsToDisplay = await retrieveSearchResults(query);

    searchResults.innerHTML = postsToDisplay.map(generatePostHTML).join("");
  });
});

// searchBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   openModal();
// });

//close model event handlers
//modal button X

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", function () {
    closeModal();
    enableScroll();
  });
  //close modal event handler
  //esc key and backspace
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden_all")) {
      closeModal();
      enableScroll();
    }

    if (e.key === "Backspace" && !modal.classList.contains("hidden_all")) {
      closeModal();
      enableScroll();
    }
  });
}

/////////////////////////////////////////////////////////////////////////////
//popovers over Nav links
//path is Services -> Joint Replacement

const htmlContentJointReplacement = `
<div class="row d-flex justify-content-center popover--ctn">
  <div class="col">
  <h6 class="popover_surgeon_name space__down">Dr. Crum</h6>
  <a href="joshuacrum.html">
    <img class="popover_nav_img_spacing"
      src="images/doctor_headshot_images/jc_rectangular_thumbnail.png"
      alt="doctor avatar" 
    />
    </a>
  </div>
  <div class="col">
  <h6 class="popover_surgeon_name space__down">
  Dr. Robinson 
  </h6>
    <a href="johndrobinson.html">
    <img class="popover_nav_img_spacing image_thumbnail_nav"
      src="images/doctor_headshot_images/jdr_rectangular_thumbnail.png"
      alt="doctor avatar"
    />
    </a>
    </div>
    <div class="col">
  <h6 class="popover_surgeon_name space__down">
  Dr. Saini 
  </h6>
  <a href="aseemsaini.html">
    <img class="popover_nav_img_spacing image_thumbnail_nav"
      src="images/doctor_headshot_images/as_rectangular_thumbnail.png"
      alt="doctor avatar"
    />
    </a>
    </div>
    
</div>
`;

const elementJointReplacement = document.getElementById("jointReplacement");
const popover = new bootstrap.Popover(elementJointReplacement, {
  container: "body",
  title: '<h6 class="popover_title">SURGEONS</h6>',
  content: htmlContentJointReplacement,
  html: true,
});

elementJointReplacement.addEventListener("shown.bs.popover", function () {
  const oldHandler = popover.hide,
    pel = $(popover.tip);
  pel.on("mouseenter", () => (popover.hide = () => 1));
  pel.on("mouseleave", () => {
    popover.hide = oldHandler;
    popover.hide();
  });
});

/////////////////////////////////////////////////////////////////////////////
//popovers over Nav links
//path is Services -> ...Sports Medicine and Fracture Care

const htmlContentSportsFracture = `
<div class="row d-flex justify-content-center popover--ctn">
  <div class="col">
  <h6 class="popover_surgeon_name space__down">Dr. Crum</h6>
  <a href="joshuacrum.html">
    <img class="popover_nav_img_spacing"
      src="images/doctor_headshot_images/jc_rectangular_thumbnail.png"
      alt="doctor avatar" 
    />
    </a>
  </div>
  <div class="col">
  <h6 class="popover_surgeon_name space__down">
  Dr. Robinson 
  </h6>
    <a href="johndrobinson.html">
    <img class="popover_nav_img_spacing image_thumbnail_nav"
      src="images/doctor_headshot_images/jdr_rectangular_thumbnail.png"
      alt="doctor avatar"
    />
    </a>
    </div>
    
</div>
`;

const elementSportsMedicine = document.querySelectorAll(
  '[data-bs-toggle="popoverSportsFracture"]'
);

const popoverSports = [...elementSportsMedicine].map((element) => {
  const popover = new bootstrap.Popover(element, {
    container: "body",
    title: '<h6 class="popover_title">SURGEONS</h6>',
    content: htmlContentSportsFracture,
    html: true,
  });

  element.addEventListener("shown.bs.popover", () => {
    const oldHandler = popover.hide,
      pel = $(popover.tip);
    pel.on("mouseenter", () => (popover.hide = () => 1));
    pel.on("mouseleave", () => {
      popover.hide = oldHandler;
      popover.hide();
    });
  });
});

/////////////////////////////////////////////////////////////////////////////
//popovers over Nav links
//path is Services -> Foot and Ankle

const htmlContentFootAnkle = `
<div class="row d-flex justify-content-center popover--ctn">
  <div class="col">
  <h6 class="popover_surgeon_name space__down">Dr. McDonnell</h6>
  <a href="markmcdonnell.html">
    <img class="popover_nav_img_spacing"
      src="images/doctor_headshot_images/mm_rectangular_thumbnail.png"
      alt="doctor avatar" 
    />
    </a>
  </div>
  <div class="col">
  <h6 class="popover_surgeon_name space__down">
  Dr. Saini 
  </h6>
    <a href="aseemsaini.html">
    <img class="popover_nav_img_spacing image_thumbnail_nav"
      src="images/doctor_headshot_images/as_rectangular_thumbnail.png"
      alt="doctor avatar"
    />
    </a>
    </div>
    
</div>
`;

const elementFootAnkle = document.getElementById("footAnkle");

const popoverFootAnkle = new bootstrap.Popover(elementFootAnkle, {
  container: "body",
  title: '<h6 class="popover_title">SURGEONS</h6>',
  content: htmlContentFootAnkle,
  html: true,
});

elementFootAnkle.addEventListener("shown.bs.popover", () => {
  const oldHandler = popoverFootAnkle.hide,
    pel = $(popoverFootAnkle.tip);
  pel.on("mouseenter", () => (popoverFootAnkle.hide = () => 1));
  pel.on("mouseleave", () => {
    popoverFootAnkle.hide = oldHandler;
    popoverFootAnkle.hide();
  });
});

/////////////////////////////////////////////////////////////////////////////
//popovers over Nav links
//path is Services -> Hand

const htmlContentHand = `
<div class="row">
  <div class="col">
  <h6 class="popover_surgeon_name space__down">Dr. Mundanthenum</h6>
  <a href="georgemundanthanum.html">
    <img class="popover_nav_img_spacing single_img_thumbnail"
      src="images/doctor_headshot_images/gm_rectangular_thumbnail.png"
      alt="doctor avatar"/>
    </a>
  </div>
</div>
`;

const elementHand = document.getElementById("hand");

const popOverHand = new bootstrap.Popover(elementHand, {
  container: "body",
  title: '<h6 class="popover_title">SURGEONS</h6>',
  content: htmlContentHand,
  html: true,
});

elementHand.addEventListener("shown.bs.popover", () => {
  const oldHandler = popOverHand.hide,
    pel = $(popOverHand.tip);
  pel.on("mouseenter", () => (popOverHand.hide = () => 1));
  pel.on("mouseleave", () => {
    popOverHand.hide = oldHandler;
    popOverHand.hide();
  });
});

//////////////////////////////////////////////////////////////////////////////
//lazy loading functionality for images

// const loadImg = function (entries, observer) {
//   const [entry] = entries;
//   console.log(imgTargets);

//   if (!entry.isIntersecting) return;

//   //replace the src attribute from image with data-src

//   entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener("load", function () {
//     entry.target.classList.remove("lazy-loading-img");
//   });
// };
// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
// });

// imgTargets.forEach((img) => imgObserver.observe(img));

//Headshot for Joshua Crum
const popoverTriggerListHeadshotJc = document.getElementById("popOverJC");

document.addEventListener("DOMContentLoaded", function () {
  const htmlJoshua = `<div class="popover_container">
                <ul> 
                <li class="animation_li">Sports Medicine</li>
                <li class="animation_li">General Orthopedics</li>
                <li class="animation_li">Knee and Shoulder Arthroscopy</li>
                <li class="animation_li">Shoulder, hip, and knee joint replacement</li>
                <li class="animation_li">Fracture Care</li>
                <li class="animation_li">Injections</li>
                </ul>
                </div>`;

  const popoverHeadShoJC = new bootstrap.Popover(popoverTriggerListHeadshotJc, {
    title: '<h6 class="popover_title">Top Procedures</h6>',
    offset: [-100, -100],
    content: htmlJoshua,
    html: true,
  });
});

/////////////////////////////////////////////////////////////////////////////
//popovers over headshots
//headshot for surgeon -> popover

const popoverTriggerListHeadShotMark = document.getElementById("headShotMM");

document.addEventListener("DOMContentLoaded", function () {
  const htmlMark = `<div class="popover_container">
                <ul>
                <li class="animation_li">Foot and ankle surgery</li>
                <li class="animation_li">Injections, ingrown nails, wound care, diabetic care </li>
                <li class="animation_li">Bunions, hammertoes, ankle arthroscopy, arthritis, heal pain</li>
                <li class="animation_li">Ankle sprains, total ankle replacement, fractures of the foot/ankle</li>
                </ul>
                </div>
              `;

  const popoverHeadShotMD = new bootstrap.Popover(
    popoverTriggerListHeadShotMark,
    {
      title: '<h6 class="popover_title">Top Procedures</h6>',
      offset: [-100, -100],
      content: htmlMark,
      html: true,
    }
  );
});

//headshot for George Mundanthanum

const popoverTriggerListHeadshotGeorge = document.getElementById("popOverGm");

document.addEventListener("DOMContentLoaded", function () {
  const htmlGeorge = `<div class="popover_container">
                <ul> 
                <li class="animation_li">Hand and wrist surgery</li>
                <li class="animation_li">Fractures and trauma of the hand and wrist</li>
                <li class="animation_li">Degenerative conditions</li>
                <li class="animation_li">Neuropathies</li>
                <li class="animation_li">Microsurgery</li>
                </ul>`;

  const popoverHeadShotGM = new bootstrap.Popover(
    popoverTriggerListHeadshotGeorge,
    {
      title: '<h6 class="popover_title">Top Procedures</h6>',
      offset: [-100, -100],
      content: htmlGeorge,
      html: true,
    }
  );
});

//Headshot for John D. Robinson

const popoverTriggerListHeadshotJohn = document.getElementById("popOverJr");

document.addEventListener("DOMContentLoaded", function () {
  const htmlJohn = `
              <div class="popover_container">
                <ul> 
                <li class="animation_li">Sports Medicine</li>
                <li class="animation_li">Knee and Shoulder Arthroscopy</li>
                <li class="animation_li">General Orthopedics</li>
                <li class="animation_li">Patient-Specific shoulder replacement</li>
                <li class="animation_li">Mako robtic hip and knee joint replacement</li>
                <li class="animation_li">Fracture Care</li>
                <li class="animation_li">Injections</li>
                </ul>
                </div>
                `;

  const popoverHeadShotJR = new bootstrap.Popover(
    popoverTriggerListHeadshotJohn,
    {
      title: '<h6 class="popover_title">Top Procedures</h6>',
      offset: [-100, -100],
      content: htmlJohn,
      html: true,
    }
  );
});

//headshot index page for Aseem Saini

const popoverTriggerListHeadshotAseem = document.getElementById("popOverAs");

document.addEventListener("DOMContentLoaded", function () {
  const htmlAseem = `<div class="popover_container">
                <ul>
                <li class="animation_li">Foot and ankle Surgery</li>
                <li class="animation_li">Injections, ingrown nails, would care, diabetic care </li>
                <li class="animation_li">Bunions, hammertoes, ankle arthroscopy, arthrities, heal pain</li>
                <li class="animation_li">Ankle sprains, total ankle replacement, fractures of the foot/ankle</li>
                </ul>
                </div>`;

  const popoverHeadShotJR = new bootstrap.Popover(
    popoverTriggerListHeadshotAseem,
    {
      title: '<h6 class="popover_title">Top Procedures</h6>',
      offset: [-100, -100],
      content: htmlAseem,
      html: true,
    }
  );
});

////////////////////////////////////////////////////////////////////////
/*Navy blue 3rd conatiner on index page */
//Display on screen is :
// 5 orthopedics Specialists 12 Years in practice

const counters = document.querySelectorAll(".counter");
const containerDoctorCount = document.getElementById("counterBox");

if (containerDoctorCount) {
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
}

// ((g) => {
//   var h,
//     a,
//     k,
//     p = "The Google Maps JavaScript API",
//     c = "google",
//     l = "importLibrary",
//     q = "__ib__",
//     m = document,
//     b = window;
//   b = b[c] || (b[c] = {});
//   var d = b.maps || (b.maps = {}),
//     r = new Set(),
//     e = new URLSearchParams(),
//     u = () =>
//       h ||
//       (h = new Promise(async (f, n) => {
//         await (a = m.createElement("script"));
//         e.set("libraries", [...r] + "");
//         for (k in g)
//           e.set(
//             k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
//             g[k]
//           );
//         e.set("callback", c + ".maps." + q);
//         a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
//         d[q] = f;
//         a.onerror = () => (h = n(Error(p + " could not load.")));
//         a.nonce = m.querySelector("script[nonce]")?.nonce || "";
//         m.head.append(a);
//       }));
//   d[l]
//     ? console.warn(p + " only loads once. Ignoring:", g)
//     : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
// })({ key: "AIzaSyD7dJQe310hYqb1SXhwttNhjsKay8cDkao", v: "beta" });

// // Initialize and add the map
// let map;

// async function initMap() {
//   // The location of Uluru
//   const position = { lat: 29.851600686672842, lng: -97.94693195911728 };
//   // Request needed libraries.
//   //@ts-ignore
//   const { Map } = await google.maps.importLibrary("maps");
//   const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//   // The map, centered at Uluru
//   map = new Map(document.getElementById("map"), {
//     zoom: 16,
//     center: position,
//     mapId: "DEMO_MAP_ID",
//   });

//   // The marker, positioned at Uluru
//   const marker = new AdvancedMarkerElement({
//     map: map,
//     position: position,
//     title: "Uluru",
//   });
// }

// initMap();

///////////////////////////////////////////////////////////////
//Appointment form request submission
//appointment.html

// import emailjs from "@emailjs/browser";

//const form = document.getElementById("appointmentForm");
// const firstNameInput = document.getElementById("firstName");
// const lastNameInput = document.getElementById("lastName");
// const mobileNumber = document.getElementById("mobileNumber");
// const email = document.getElementById("email");

// firstNameInput.addEventListener("input", (e) => console.log(e.target.value));

//validation needed for form

// mobileNumber.addEventListener("input", function (e) {
//   console.log(e.target.value);
// });

///////////////////////////////////////////////////////////////
//individual bio pages
//container retract and expand functionality

const retractBioButton = document.querySelectorAll(".fa-minus-circle");
const entireSection = document.querySelectorAll(".block-content");
const showViewText = document.querySelectorAll(".exp-status-view");
const removeHideText = document.querySelectorAll(".exp-status-hide");
const expandBioButton = document.querySelectorAll(".fa-plus-circle");

for (let i = 0; i < retractBioButton.length; i++) {
  retractBioButton[i].addEventListener("click", function () {
    entireSection[i].classList.add("hide_content");
    expandBioButton[i].style.display = "inline";
    removeHideText[i].style.display = "none";
    showViewText[i].style.display = "inline";
    retractBioButton[i].style.display = "none";
  });
}

for (let i = 0; i < expandBioButton.length; i++) {
  expandBioButton[i].addEventListener("click", function () {
    entireSection[i].classList.remove("hide_content");
    expandBioButton[i].style.display = "none";
    removeHideText[i].style.display = "inline";
    showViewText[i].style.display = "none";
    retractBioButton[i].style.display = "inline";
  });
}
