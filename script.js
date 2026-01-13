import MENU_DATA from "./menudata.js";

/* ===================== SEARCH (INDEX) ===================== */
const indexSearchInput = document.getElementById("searchInput");
const indexSearchButton = document.getElementById("searchButton");
const indexMealList = document.getElementById("mealList");
const searchSection = document.querySelector(".search-result-section");

function displayMeals(meals) {
  indexMealList.innerHTML = "";

  if (!meals || meals.length === 0) {
    indexMealList.innerHTML = "<p>Tiada menu dijumpai.</p>";
  } else {
    meals.forEach((meal) => {
      const div = document.createElement("div");
      div.className = "meal-item";
      div.innerHTML = `
        <img src="${meal.img}" alt="${meal.name}">
        <h3>${meal.name}</h3>
        <p>${meal.desc}</p>
        <a href="${meal.video}" target="_blank">Video Tutorial</a>
      `;
      indexMealList.appendChild(div);
    });
  }

  // ✅ AUTO SCROLL KE SEARCH SECTION
  searchSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
  

  // ✨ OPTIONAL: highlight effect
  searchSection.classList.remove("highlight");
  void searchSection.offsetWidth; // force reflow
  searchSection.classList.add("highlight");
}

// Klik search
indexSearchButton.addEventListener("click", () => {
  const query = indexSearchInput.value.trim().toLowerCase();
  if (!query) return;

  const results = MENU_DATA.filter((m) =>
    m.name.toLowerCase().includes(query)
  );

  displayMeals(results);
});

// Tekan ENTER untuk search
indexSearchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") indexSearchButton.click();
});

/* ===================== HERO SLIDER ===================== */
const heroImg = document.getElementById("shuffleImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const images = ["food1.jpg", "food2.jpg", "food3.jpg", "food4.jpg"];
let currentIndex = 0;
let sliderInterval;

function showImage(index) {
  heroImg.classList.add("fade-out");

  setTimeout(() => {
    heroImg.src = images[index];
    heroImg.onload = () => heroImg.classList.remove("fade-out");
  }, 300);
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
  resetAutoSlide();
});

function startAutoSlide() {
  sliderInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(sliderInterval);
  startAutoSlide();
}

startAutoSlide();
// CATEGORY CLICK
document.querySelectorAll(".meal-time").forEach(btn=>{
    btn.addEventListener("click", e=>{
        e.preventDefault();
        const category = btn.dataset.category;
        const filtered = MENU_DATA.filter(m=>m.category===category);
        displayMeals(filtered);
    });
});

/* ===================== MENU VIRAL ===================== */
const viralMenu = [
  {
    name: "Ayam Gepuk Viral",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYxDupy0vleeMqQZGyRkkSzDhtpSbc2d1-nA&s",
    desc: "Ayam goreng rangup dengan sambal pedas.",
    steps: ["Perap ayam", "Goreng rangup", "Tumbuk sambal"],
    video: "https://www.youtube.com/embed/pIPn6jhZ4Zs"
  },
  {
    name: "Air Matcha Strawberry",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrgxaPSLpbeTb6gWxekKz8eD-_l9tJHurncQ&s",
    desc: "Minuman matcha segar dengan perisa strawberi.",
    steps: [
      "Sediakan strawberi",
      "Masukkan susu",
      "Tambah matcha",
      "Letak ais & kacau"
    ],
    video: "https://www.youtube.com/embed/RZ93Jp3mL7U?si=7UNkGKKvI_gJXiGC" 
  }
];

const viralGrid = document.getElementById("viralGrid");
const modal = document.querySelector(".modal-container");
const modalContent = document.querySelector(".meal-details-content");

if (viralGrid) {
  viralMenu.forEach((m) => {
    const card = document.createElement("div");
    card.className = "viral-card";
    card.innerHTML = `
      <img src="${m.img}" alt="${m.name}">
      <h3>${m.name}</h3>
    `;
    card.onclick = () => showViralDetails(m);
    viralGrid.appendChild(card);
  });
}

function showViralDetails(m) {
  modalContent.innerHTML = `
    <button class="close-button">&times;</button>
    <h2>${m.name}</h2>
    <img src="${m.img}" style="width:100%;border-radius:10px">
    <p>${m.desc}</p>
    <h4>Langkah-langkah</h4>
    <ul>${m.steps.map(s => `<li>${s}</li>`).join("")}</ul>
    <iframe width="100%" height="250" src="${m.video}" allowfullscreen></iframe>
  `;
  modal.style.display = "flex";

  modalContent.querySelector(".close-button").onclick = closeModal;
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.style.display = "none";
  const iframe = modalContent.querySelector("iframe");
  if (iframe) iframe.src = iframe.src;
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    closeModal();
  }
});

