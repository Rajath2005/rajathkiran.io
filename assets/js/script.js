'use strict';


// Element toggle function with error handling
const elementToggleFunc = (elem) => {
  if (elem && elem.classList) {
    elem.classList.toggle("active");
  } else {
    console.warn("Invalid element passed to elementToggleFunc");
  }
};

// for Typing effects
const roles = ["Web Developer", "Intern", "Web Designer", "Beginning Coder"];
let roleIndex = 0;
let charIndex = 0;
const changingText = document.getElementById("changing-text");

function typeEffect() {
  if (charIndex < roles[roleIndex].length) {
    changingText.textContent += roles[roleIndex][charIndex];
    charIndex++;
    setTimeout(typeEffect, 100); // Adjust speed
  } else {
    setTimeout(eraseEffect, 1000); // Pause before erasing
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    changingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 50); // Faster erasing speed
  } else {
    roleIndex = (roleIndex + 1) % roles.length; // Move to the next role
    setTimeout(typeEffect, 500);
  }
}

// Start the effect
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeEffect, 500);
});


// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Ensure elements exist before adding event listener
if (sidebar && sidebarBtn) {
  // Sidebar toggle functionality for mobile
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
} else {
  console.warn("Sidebar or Sidebar Button not found in the DOM.");
}




// testimonials variables
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainers = document.querySelectorAll("[data-modal-container]");
const overlays = document.querySelectorAll("[data-overlay]");

// modal toggle function
const testimonialsModalFunc = function (modal) {
  modal.classList.toggle("active");
};

// add click event to all modal items
testimonialsItems.forEach((item, index) => {
  item.addEventListener("click", function () {
    const modalContainer = modalContainers[index]; // Get the correct modal

    const modalImg = modalContainer.querySelector("[data-modal-img]");
    const modalTitle = modalContainer.querySelector("[data-modal-title]");
    const modalText = modalContainer.querySelector("[data-modal-text]");

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc(modalContainer);
  });
});

// add click event to modal close button and overlay
modalContainers.forEach((modal) => {
  const closeButton = modal.querySelector("[data-modal-close-btn]");
  const overlay = modal.querySelector("[data-overlay]");

  closeButton.addEventListener("click", () => testimonialsModalFunc(modal));
  overlay.addEventListener("click", () => testimonialsModalFunc(modal));
});




// Code for My Certificates Scetion


document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-image");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  // Open modal on thumbnail click
  document.querySelectorAll(".thumbnail").forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.getAttribute("data-full");
      captionText.innerText = this.alt;
    });
  });

  // code for paginations
  const slides = document.querySelectorAll(".experience-card");
const dotsContainer = document.querySelector(".pagination-dots");

// Create dots dynamically
slides.forEach((_, index) => {
  let dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => showSlide(index));
  dotsContainer.appendChild(dot);
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });

  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// Initialize first slide
showSlide(0);


  // Close modal on close button click
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}