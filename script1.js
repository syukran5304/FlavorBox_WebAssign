import MENU_DATA from "./menudata.js";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const mealList = document.getElementById("mealList");
const modalContainer = document.querySelector(".modal-container");
const mealDetailsContent = document.querySelector(".meal-details-content");

console.log("SCRIPT LOADED:", MENU_DATA.length);

// DISPLAY MEALS
function displayMeals(meals){
    mealList.innerHTML = "";
    if(!meals || meals.length === 0){
        mealList.innerHTML = "<p>Tiada menu dijumpai.</p>";
        return;
    }
    meals.forEach(meal=>{
        const div = document.createElement("div");
        div.className = "meal-item";
        div.innerHTML = `
            <img src="${meal.img}" alt="${meal.name}">
            <h3>${meal.name}</h3>
        `;
        div.addEventListener("click", ()=>showDetails(meal));
        mealList.appendChild(div);
    });
}

// MODAL DETAILS + VIDEO
function showDetails(meal){
    mealDetailsContent.innerHTML = `
        <button class="close-button">&times;</button>
        <h2>${meal.name}</h2>
        <img src="${meal.img}" style="width:100%;border-radius:10px" alt="${meal.name}">
        <p>${meal.desc}</p>
        <h3>Langkah-langkah</h3>
        <ul>
            ${meal.steps.map(step=>`<li>${step}</li>`).join("")}
        </ul>
        <iframe 
            id="videoFrame"
            width="100%" 
            height="250" 
            src="${meal.video}" 
            frameborder="0" 
            allowfullscreen>
        </iframe>
    `;

    modalContainer.style.display = "flex";

    mealDetailsContent.querySelector(".close-button")
        .addEventListener("click", closeModal);
}

// CLOSE MODAL (STOP VIDEO)
function closeModal(){
    modalContainer.style.display = "none";
    const iframe = document.getElementById("videoFrame");
    if(iframe) iframe.src = "";
}

// CLICK OUTSIDE MODAL
modalContainer.addEventListener("click", e=>{
    if(e.target === modalContainer){
        closeModal();
    }
});
// TUTUP MODAL GUNA ESC
document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modalContainer.style.display === "flex") {
        closeModal();
    }
});


// CATEGORY FILTER
document.querySelectorAll(".meal-time").forEach(btn=>{
    btn.addEventListener("click", e=>{
        e.preventDefault();
        const category = btn.dataset.category;
        const filtered = MENU_DATA.filter(m=>m.category===category);
        displayMeals(filtered);
    });
});

// SEARCH
searchButton.addEventListener("click", ()=>{
    const keyword = searchInput.value.trim().toLowerCase();
    if(!keyword) return;
    const results = MENU_DATA.filter(m=>m.name.toLowerCase().includes(keyword));
    displayMeals(results);
});

searchInput.addEventListener("keyup", e=>{
    if(e.key==="Enter") searchButton.click();
});

// AUTO LOAD SARAPAN
window.addEventListener("load", ()=>{
    const sarapan = MENU_DATA.filter(m=>m.category==="sarapan");
    displayMeals(sarapan);
});
