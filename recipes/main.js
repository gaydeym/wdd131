import recipes from "./recipes.mjs";

const container = document.getElementById("recipes");
const form = document.getElementById("searchForm");
const input = document.getElementById("search");

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    return list[random(list.length)];
}

function tagsTemplate(tags) {
    return (tags || [])
        .map((tag) => `<span class="recipe-tag">${tag}</span>`)
        .join(" ");
}

function ratingTemplate(rating) {
    let html = `<span class="recipe-rating rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        html += `<span aria-hidden="true" class="${i <= rating ? "icon-star" : "icon-star-empty"}">${i <= rating ? "⭐" : "☆"}</span>`;
    }
    html += "</span>";
    return html;
}

function recipeTemplate(recipe) {
    return `
    <article class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
      <div class="recipe-info">
        <div class="recipe-tags">${tagsTemplate(recipe.tags)}</div>
        <div class="recipe-title">${recipe.name}</div>
        ${ratingTemplate(recipe.rating)}
        <div class="recipe-desc">${recipe.description || ""}</div>
      </div>
    </article>
  `;
}

function renderRecipes(recipeList) {
    container.innerHTML = recipeList.map(recipeTemplate).join("");
}

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

init();

function filterRecipes(query) {
    const filtered = recipes.filter(
        (r) =>
        r.name.toLowerCase().includes(query) ||
        (r.description && r.description.toLowerCase().includes(query)) ||
        (Array.isArray(r.tags) &&
            r.tags.find((tag) => tag.toLowerCase().includes(query))) ||
        (Array.isArray(r.recipeIngredient) &&
            r.recipeIngredient.find((ing) =>
                ing.toLowerCase().includes(query)
            ))
    );
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(e) {
    e.preventDefault();
    const value = input.value.trim().toLowerCase();
    const toRender = value ? filterRecipes(value) : recipes;
    renderRecipes(toRender);
}

form.addEventListener("submit", searchHandler);
input.addEventListener("input", () => form.dispatchEvent(new Event("submit")));